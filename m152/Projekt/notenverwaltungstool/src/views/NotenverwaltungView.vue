<template>
  <div class="home">
    <header>Notenverwaltungssystem</header>
    <main>
      <div v-for="(grades, subject) in Subjects" :key="subject">
        <h1>{{ subject }}</h1>
        <div v-for="(grade, index) in grades.grades" :key="index">
          <span>
            {{ displayGrade(grade) }}
            <button @click="deleteGrade(subject, index)">X</button>
          </span>
        </div>
        <div>
          <input type="number" min="0" max="6" @keyup.enter="addGrade($event, subject)" />
          <p>{{ subject }} Ø: {{ displaySubjectAvarage(subject) }}</p>
        </div>
      </div>
      <div>
        <label type="text">Neues Fach: </label>
        <input type="text" @keyup.enter="addSubject($event)"/>
      </div>
    </main>
    <footer>
      Gesamt Ø: {{ displayTotalAvarage() }}
    </footer>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";

const Subjects = ref({
  M151: { grades: [5, 5.5, 5.75] },
  M152: { grades: [5, 5.5] },
  M153: { grades: [5] },
  M306: { grades: [4, 4.5, 4.75] },
  NWS: { grades: [4, 4.5] },
  WUR: { grades: [4] },
  SPK: { grades: [6] },
  GES: { grades: [6, 6] },
  SPO: { grades: [6, 6, 6] },
});

function addGrade(e, subject) {
  let newGrade = Math.min(6, Math.max(1, parseFloat(e.target.value)));
  Subjects.value[subject].grades.push(newGrade);
}

function deleteGrade(subject, grade) {
  Subjects.value[subject].grades.splice(grade, 1);
}

function calculateAverageGrade(subject) {
  let sum = 0;
  for (let grade of Subjects.value[subject].grades) {
    sum += grade;
  }
  return sum / Subjects.value[subject].grades.length;
}

function calculateAverageGradeFromAllSubjects() {
  let sum = 0;
  let count = 0;
  for (let grades in Subjects.value) {
    for (let grade of Subjects.value[grades].grades) {
      sum += grade;
      count++;
    }
  }
  return sum / count;
}

function addSubject(e) {
  Subjects.value[e.target.value] = { grades: [] };
}

function displaySubjectAvarage(subject) {
  return parseFloat(calculateAverageGrade(subject)).toFixed(2);
}

function displayTotalAvarage() {
  return parseFloat(Math.round(calculateAverageGradeFromAllSubjects()*2)/2).toFixed(2)
}

function displayGrade(grade) {
  return parseFloat(grade).toFixed(2)
}
</script>
<style lang="scss">
main {
  display: flex;
  margin-top: 30px;
  margin-bottom: 30px;
  >div {
    background-color: lightgray;
  }
  :last-child {
    padding: 5px;
  }
}
header {
  background-color: aqua;
  position: fixed;
  top: 0;
  width: 100%;
}
footer {
  background-color: aqua;
  position: fixed;
  bottom: 0;
  width: 100%;
}
@media screen and (min-width: 550px) {
  main {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    >div {
      >h1 {
        font-size: large;
        font-weight: bold;
      }
      width: 300px;
      margin: 5px;
    }
  }
  header {
    font-size: xx-large;
    font-weight: bolder;
  }
  footer {
    font-size: xx-large;
    font-weight: bolder;
  }
}
@media screen and (max-width: 550px) {
  main {
    flex-direction: column;
    align-items: center;
    >div {
      >h1 {
        font-size: medium;
        font-weight: bold;
      }
      width: 95vw;
      margin: 5px;
    }
  }
  header {
    font-size: large;
    font-weight: bolder;
  }
  footer {
    font-size: large;
    font-weight: bolder;
  }
}
</style>