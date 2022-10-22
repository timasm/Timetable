from ctypes import ArgumentError
import constraint as cs
from random import randint, choice
from multiprocessing import Process, Array
import time

# Ideas
# Force amount of working hours
#
# Importance of Constraints. If no solution is found, the constrains are relaxed from least to most important
# Working hours > Timeslot preferences > combined working hours (e.g. rather have two workingsshifts in the same morning than in different mornings)
#

# CONSTANTS

WORKING_TIMES = ["m8_10","m10_12","m12_14","m14_16",
                 "d8_10","d10_12","d12_14","d14_16",
                 "w8_10","w10_12","w12_14","w14_16",
                 "t8_10","t10_12","t12_14","t14_16",
                 "f8_10","f10_12","f12_14","f14_16", "s8_10","s10_12","s12_14","s14_16"]
WORKING_TIMES_MORNING = ["m8_10","m10_12",
                         "d8_10","d10_12",
                         "w8_10","w10_12",
                         "t8_10","t10_12",
                         "f8_10","f10_12",]
WORKING_TIMES_NOON = ["m10_12","m12_14",
                      "d10_12","d12_14",
                      "w10_12","w12_14",
                      "t10_12","t12_14",
                      "f10_12","f12_14"]
WORKING_TIMES_AFTERNOON = ["m12_14","m14_16",
                           "d12_14","d14_16",
                           "w12_14","w14_16",
                           "t12_14","t14_16",
                           "f12_14","f14_16"]


class Timetable(cs.Problem):
    """
    Class used to create timetables.
    """

    def __init__(self, type=None):
        if type is not None:
            super().__init__(type)
        else:
            super().__init__()

        self.worker = {}
        self.ids = {}
        self.combined_hours = []
        self.timetable = None
        self.working_times = WORKING_TIMES
        self.working_times_morning = WORKING_TIMES_MORNING
        self.working_times_afternoon = WORKING_TIMES_AFTERNOON
        
    def add_worker(self, name, working_hours=None, preferences=None, id=None):
        """
        add worker as variable
        Example:
        >>> p = Timetable()
        >>> p.add_worker("Andrew", 8, self.working_times)
        """
        if name in self.worker.keys():
            return ArgumentError("name is already in database")

        if len(self._variables.keys()) == 0:
               self.addVariables(self.working_times, [name])
               self.worker[name] = (working_hours, preferences, id)
               self.ids[id] = name
               return

        self.worker[name] = (working_hours, preferences, id)
        self.ids[id] = name
        for key in self._variables.keys():
            self._variables[key].append(name)

    def set_working_hours(self, name, working_hours):
        """
        set a new amount of working hours for name
        Example:
        >>> p = Timetable()
        >>> p.add_worker("Andrew", preferences=self.working_times)
        >>> p.set_working_hours("Andrew", 5)
        """
        self.worker[name][0] = working_hours

    def set_working_preferences(self, name, preferences):
        """
        set a new domain (preferences) for name
        Example:
        >>> p = Timetable()
        >>> p.add_worker("Andrew", 8)
        >>> p.set_working_preferences("Andrew", WORKING_TIMES_MORNING)
        """
        self.worker[name] = (self.worker[name][0], preferences, self.worker[name][2])

    def constrain_working_hours(self, name, special_hours=None):
        """
        add constraints for name to the CSP. If special_hours is defined, these are used if not, then the ones which were chosen as the variable was added
        Example:
        >>> p = Timetable()
        >>> p.add_worker("Andrew", preferences=WORKING_TIMES)
        >>> p.set_working_hours("Andrew", 5)
        >>> p.constrain_working_hours("Andrew")
        """

        if special_hours is not None:
            self.addConstraint(lambda *working_times: sum(list(map(lambda x: x==name, working_times))) <= special_hours, self.working_times)
            return
        elif self.worker[name][0] is not None:
            self.addConstraint(lambda *working_times: sum(list(map(lambda x: x==name, working_times))) <= self.worker[name][0], self.working_times)
        else: 
            raise ArgumentError("no working hours specified")

    def constrain_working_preferences(self, name, preferences=None):
        """
        add preferences for the working time slots. They are relaxed if no solution is found
        Example:
        >>> p = Timetable()
        >>> p.add_worker("Andrew", 8)
        >>> p.set_preferences("Andrew", WORKING_TIMES_MORNING)
        >>> p.constrain_working_preferences("Andrew")
        """
        if name not in self.worker.keys():
            return ArgumentError("name is not apparent in database")
        if self.worker[name][1] is None:
            if preferences is None:
                return ArgumentError(f"no preferences for {name} specified")
            else:
                self.worker[name] = (self.worker[name][0], preferences, self.worker[name][2])
                for key in self._variables.keys():
                    if name in self._variables[key] and key not in preferences:
                        self._variables[key].remove(name)
        else:
            for key in self._variables.keys():
                if name in self._variables[key] and key not in self.worker[name][1]:
                    self._variables[key].remove(name)

    def _constrain_combined_hours(self):
        """
        adds the constraint that all adjacent working shifts are booked for the same worker. These are getting relaxed if no solution is found
        Example:
        8-10 Andrew, 10-12 Andrew, 12-14 Max, 14-16 Max is preferred over
        8-10 Andrew, 10-12 Max, 12-14 Andrew, 14-15 Max
        """
        for i in range(len(self.working_times) - 1):
            if self.working_times[i][0] != self.working_times[i+1][0]:
                continue
            self.addConstraint(lambda x1, x2: x1 == x2, [self.working_times[i], self.working_times[i+1]])
            self.combined_hours.append((i, i+1))
            

    def _relax_preferences(self):
        random_worker_name = choice(list(filter(lambda x: type(x) != int, self.worker.keys())))
        for worker in self.worker:
            if worker[1] is None:
                break
        else:
            return
        while len(self.worker[random_worker_name]) <= len(self.working_times):
            print(2)
            if self.worker[random_worker_name][1] is None:
                random_worker_name = choice(list(filter(lambda x: type(x) != int, self.worker.keys())))
                continue
            random_worker_shift_index = self.working_times.index(choice(self.worker[random_worker_name][1]))
            candidate = None
            for _ in range(5):
                if (random_worker_shift_index) % 4 == 0:
                    candidate = random_worker_shift_index + 2
                elif (random_worker_shift_index - 1) % 4 == 0:
                    candidate = choice([random_worker_shift_index + 1, random_worker_shift_index - 1])
                elif (random_worker_shift_index - 2) % 4 == 0:
                    candidate = choice([random_worker_shift_index + 1, random_worker_shift_index - 1])
                elif (random_worker_shift_index - 3) % 4 == 0:
                    candidate = random_worker_shift_index - 2
                if candidate in self.worker[random_worker_name][1]:
                    candidate = None
                else:
                    break
            if candidate is None:
                continue
            self.set_working_preferences(random_worker_name, self.worker[random_worker_name][1] + [self.working_times[candidate]])
            return random_worker_name, self.working_times[candidate]

    def _relax_combined_hours(self):
        if len(self.combined_hours) == 0: return
        random_hour_combo_index = randint(0, len(self.combined_hours) - 1) if len(self.combined_hours) > 1 else 0
        random_hour_combo_index = randint(0, len(self.combined_hours) - 1)
        random_hour_combo = self.combined_hours[random_hour_combo_index]
        del self.combined_hours[random_hour_combo_index]
        for ix, el in enumerate(self._constraints):
                if el[1] == [self.working_times[random_hour_combo[0]], self.working_times[random_hour_combo[1]]]:
                    del self._constraints[ix]
        return (self.working_times[random_hour_combo[0]], self.working_times[random_hour_combo[1]])

    def generate_timetable(self, minutes):
        seconds = int(60 * minutes)
        sol = Array('i', len(self.working_times))
        process = Process(target = self._iterative_deepening, args=([sol]))
        process.start()
        time.sleep(seconds)
        print("time up")
        solution = sol[:]
        process.terminate()
        process.join()
        self.timetable = solution
        return solution
        

    def _iterative_deepening(self, sol):
        steps = 50
        relaxations = 1000
        start = time.time()
        while True:
            print(f"Time: {round((time.time()-start)/60, 2)} min")
            self._solver._steps = steps
            s = self._find_solution(max_relax=relaxations)
            if s is not False:
                if s[1] < relaxations:
                    for ix, shift in enumerate(self.working_times):
                        sol[ix] = self.worker[s[0][shift]][2]
                        if ix % 4 == 0:
                            print("\n")
                        print(shift, "\t", self.ids[sol[ix]])
                    relaxations = s[1]
                else:
                    print("too much relaxations")
            steps += 100

    def _find_solution(self, iterations=50, max_relax=1000):
        relaxations = {"combined_hours": [], "worker_preferences": []}
        self._constrain_combined_hours()
        for r in range(50):
            if (len(relaxations["combined_hours"]) + (len(relaxations["worker_preferences"]))) >= max_relax:
                print("max relax", max_relax, len(relaxations["combined_hours"]) + (len(relaxations["worker_preferences"])))
                return False
            s = self.getSolution()
            if s is not None:
                return s, (len(relaxations["combined_hours"]) + (len(relaxations["worker_preferences"])))
            else:
                relaxed_hours = self._relax_combined_hours()
                relaxed_worker = self._relax_preferences()
                relaxations["combined_hours"] += [relaxed_hours]
                relaxations["worker_preferences"] += [relaxed_worker]
            print(f"round [{r}/{iterations}]")
        return False

def main():

    p = Timetable(cs.MinConflictsSolver())
    

    p.add_worker("Flo", 3, id=0)
    p.add_worker("Bene", 3, id=1)
    p.add_worker("Lena", 3, id=2)
    p.add_worker("Christian", 3, id=3)
    p.add_worker("Flo1", 3, id=4)
    p.add_worker("Bene1", 3, id=5)
    p.add_worker("Lena1", 3, id=6)
    p.add_worker("Christian1", 3, id=7)

    p.constrain_working_hours("Flo")
    p.constrain_working_hours("Bene")
    p.constrain_working_hours("Lena")
    p.constrain_working_hours("Christian")
    p.constrain_working_hours("Flo1")
    p.constrain_working_hours("Bene1")
    p.constrain_working_hours("Lena1")
    p.constrain_working_hours("Christian1")

  #  p.constrain_working_preferences("Christian", WORKING_TIMES_AFTERNOON)
  #  p.constrain_working_preferences("Lena", WORKING_TIMES_MORNING)

    print(p.worker)

    p.generate_timetable(1)
    print(p.timetable)

#if __name__ == '__main__':
 #   main()