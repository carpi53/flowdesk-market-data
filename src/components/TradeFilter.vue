<script setup lang="ts">
import { ref } from "vue";
import { Sorting } from "../frontType";
const sortSelected = ref<Sorting>("Date");
const sortOpened = ref<boolean>(false);
const emit = defineEmits(["response"]);
const sortChoices: Sorting[] = ["Date", "Quantity", "Price"];

function handleChange(sortChoice: Sorting) {
  sortSelected.value = sortChoice;
  sortOpened.value = false;
  emit("response", sortSelected.value);
}
</script>

<template>
  <div class="container">
    <h2>Recent trades</h2>
    <div class="dropdown">
      <a href="#" @click.prevent="sortOpened = !sortOpened"
        >Sort By: {{ sortSelected }}
        <svg
          :class="{ active: sortOpened }"
          width="10"
          height="7"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1l4 4 4-4"
            stroke="#4661E6"
            stroke-width="2"
            fill="none"
            fill-rule="evenodd"
          />
        </svg>
      </a>
      <div v-if="sortOpened" class="dropdown-content">
        <ul>
          <li v-for="sortChoice in sortChoices" :key="sortChoice">
            <span @click="handleChange(sortChoice)">{{ sortChoice }}</span>
            <svg
              v-if="sortChoice === sortSelected"
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="11"
            >
              <path
                fill="none"
                stroke="#AD1FEA"
                stroke-width="2"
                d="M1 5.233L4.522 9 12 1"
              />
            </svg>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 72px;
  background-color: var(--darkerBlue);
  border-radius: 10px;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    color: white;
  }

  .dropdown {
    display: inline-block;
    position: relative;
    a {
      text-decoration: none;
      color: white;
      opacity: 0.75;
      svg {
        filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(125deg)
          brightness(102%) contrast(102%);
        transition: transform 0.1s ease-out;
      }
      svg.active {
        transform: rotate(180deg);
      }
    }
    .dropdown-content {
      width: 255px;
      position: absolute;
      top: 30px;
      border-radius: 10px;
      background-color: white;
      li {
        padding: 12px 24px;
        font-weight: 400;
        color: var(--darkGrey);
        display: flex;
        justify-content: space-between;
        align-items: center;

        span {
          cursor: pointer;
          &:hover {
            color: var(--purple);
          }
        }
      }
    }
  }
}
</style>
