// 🎓 Student Grading System
// 🏫 Create a system that manages student records and calculates their average grade.
//
// 1. Implement a class `Gradebook<T>` to store student records.
// 2. Implement a method `addStudent` that adds a new student with an empty grade list.
// 3. Implement a method `addGrade` that records a new grade for a student.
// 4. Implement a method `getAverageGrade` that returns a student’s average grade.
// 5. Implement a method `getStudentGrades` that returns all recorded grades for a student. Formula to get average: sumOfAllGrades / numberOfSubjects.
// 6. Implement a method `updateSubjectGrade` that updates a subject grade for a student.

interface Grade {
  subject: string;
  grade: number;
}

interface Student {
  id: number;
  name: string;
  grades: Grade[];
}

class Gradebook<T extends Student> {
  students: T[] = []

  addStudent(student: T): string {
    this.students.push(student);

    return `${student.name} added to the gradebook.`
  }

  addGrade(id: number, grade: Grade): string {
    const targetStudent: Student = this.students.find(student => student.id === id);

    if (targetStudent) {
      targetStudent.grades.push(grade)

      return `Grade recorded for ${grade.subject}.`
    }

    return `The student id: ${id} is undefinded.`
  }

  getAverageGrade(id: number): string {
    const targetStudent: T = this.students.find(student => student.id === id);

    if (targetStudent) {
      let sum = 0;
      targetStudent.grades.map((grade: Grade) => {
        sum += grade.grade;
      })
      
      const average = sum/targetStudent.grades.length

      return `${targetStudent.name}'s average grade is ${average}`
    }


    return `The student id: ${id} is undefinded.`
  }

  getStudentGrades(id: number): Grade[] | string {
    const targetStudent: T = this.students.find(student => student.id === id);

    if (targetStudent) {
      return targetStudent.grades
    }

    return `The student id: ${id} is undefinded.`
  }

  updateSubjectGrade(id: number, subject: string, newGrade: number): string {
    const targetStudent: T = this.students.find(student => student.id === id);

    if (targetStudent) {
      const targetGrade = targetStudent.grades.find((grade: Grade) => grade.subject === subject)

      if (targetGrade) {
        targetGrade.grade = newGrade;

        return `${targetStudent.name}'s English grade to ${newGrade}`;
      }

      return `${targetStudent.name}'s English grade is undefinded`;
    }

    return `The student id: ${id} is undefinded.`
  }
}

// Test cases
const gradebook = new Gradebook();

console.log(gradebook.addStudent({ id: 1, name: "Alice", grades: [] })); // "Alice added to the gradebook."
console.log(gradebook.addGrade(1, { subject: "Math", grade: 90 })); // "Grade recorded for Math."
console.log(gradebook.addGrade(1, { subject: "English", grade: 80 })); // "Grade recorded for English."
console.log(gradebook.addGrade(1, { subject: "Science", grade: 85 })); // "Grade recorded for Science."
console.log(gradebook.getStudentGrades(1)); // Should return all grades for Alice
console.log(gradebook.getAverageGrade(1)); // Should return Alice's average grade
console.log(gradebook.updateSubjectGrade(1, "English", 95)); // Should update Alice's English grade to 95