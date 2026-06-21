import csv


class Task:
    def __init__(self, title, description, priority):
        self.title = title
        self.description = description
        self.priority = priority

    def __str__(self):
        return f"{self.title} {self.description} (اولویت: {self.priority})"


class Todo_list:
    def __init__(self):
        self.tasks = []

    def add_task(self):
        title = input("Onvan task khodra vared konid: ")
        description = input("tozihat ra vared konid: ")
        priority = input("Olaviat ra entekhab konid(H-M-L): ")
        task = Task(title, description, priority)
        self.tasks.append(task)
        print("task ezafe shod.")

    def del_task(self):
        title = input("Onvan task khodra vared konid: ")
        found = False
        for task in self.tasks:
            if task.title == title:
                self.tasks.remove(task)
                found = True
                print("task hazf shod.")
                break
        if not found:
            print("task peida nashod")

    def show_tasks(self):
        if not self.tasks:
            print("list khali ast")
            return
        for i, task in enumerate(self.tasks, start=1):
            print(f"{i}. {task.title} (olaviat: {task.priority})")

    def save_to_csv(self, filename="tasks.csv"):
        with open(filename, mode="w", newline="", encoding="utf-8") as file:
            writer = csv.writer(file)
            writer.writerow(["title", "description", "priority"])
            for task in self.tasks:
                writer.writerow([task.title, task.description, task.priority])
        print(f"Tasks saved to {filename}")

    def load_from_csv(self, filename="tasks.csv"):
        try:
            with open(filename, mode="r", newline="", encoding="utf-8") as file:
                reader = csv.DictReader(file)
                self.tasks = []
                for row in reader:
                    task = Task(row["title"], row["description"], row["priority"])
                    self.tasks.append(task)
            print(f"Tasks loaded from {filename}")
        except FileNotFoundError:
            print(f"File {filename} not found.")


def menu():
    todo = Todo_list()
    todo.load_from_csv()

    while True:
        print("\n--- Todolist menu---")
        print("1. ezafe kardan kare jadid")
        print("2. hazfe kar")
        print("3. namayesh karha")
        print("4. zakhire dar csv")
        print("5. khoruj")

        choice = input("entekhab konid: ")

        if choice == "1":
            todo.add_task()
        elif choice == "2":
            todo.del_task()
        elif choice == "3":
            todo.show_tasks()
        elif choice == "4":
            todo.save_to_csv()
        elif choice == "5":
            print("exit")
            break
        else:
            print("lotfan meghdare sahih vared konid")


if __name__ == "__main__":
    menu()
