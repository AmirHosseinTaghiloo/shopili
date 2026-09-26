```vue
<template>
  <div dir="rtl" class="calendar-wrapper">
    <div class="calendar">

      <!-- Decorative glass -->
      <div class="glass-orb glass-orb-one"></div>
      <div class="glass-orb glass-orb-two"></div>

      <!-- Header -->
      <div class="calendar-top">
        <div>
          <div class="calendar-label ">
            تقویم
          </div>

          <div class="calendar-today">
            {{ todayDate }}
          </div>
        </div>

        <button
          type="button"
          class="calendar-today-button"
          @click="goToToday"
        >
          <span class="today-dot"></span>
          امروز
        </button>
      </div>

      <!-- Month navigation -->
      <div class="calendar-navigation">

        <!-- Next month -->
        <button
          type="button"
          class="navigation-button"
          aria-label="ماه بعد"
          @click="nextMonth"
        >
          <
        </button>

        <!-- Month + Year -->
        <div class="month-title">

          <span>
            {{ monthName }}
          </span>

          <!-- Year Picker -->
          <div class="year-picker-wrapper">

            <button
              type="button"
              class="year-button"
              @click="showYearPicker = !showYearPicker"
            >
              {{ toPersianNumber(currentYear) }}

              <span
                class="year-chevron"
                :class="{
                  'year-chevron-open': showYearPicker
                }"
              >
                
              </span>
            </button>

            <!-- Year List -->
            <Transition name="year-picker">

              <div
                v-if="showYearPicker"
                class="year-picker"
              >

                <div class="year-picker-header">
                  انتخاب سال
                </div>

                <div class="year-list">

                  <button
                    v-for="year in years"
                    :key="year"
                    type="button"
                    class="year-item"
                    :class="{
                      'year-item-active':
                        year === currentYear
                    }"
                    @click="selectYear(year)"
                  >
                    {{ toPersianNumber(year) }}
                  </button>

                </div>
              </div>

            </Transition>

          </div>

        </div>

        <!-- Previous month -->
        <button
          type="button"
          class="navigation-button"
          aria-label="ماه قبل"
          @click="previousMonth"
        >
          >
        </button>

      </div>

      <!-- Weekdays -->
      <div class="weekdays">

        <div
          v-for="day in weekDays"
          :key="day"
          class="weekday"
        >
          {{ day }}
        </div>

      </div>

      <!-- Days -->
      <div class="days-grid">

        <button
          v-for="(day, index) in calendarDays"
          :key="`${day.fullDate}-${index}`"
          type="button"
          :disabled="!day.currentMonth"
          class="day"
          :class="{
            'day-empty': !day.currentMonth,
            'day-today': day.isToday,
            'day-selected':
              day.fullDate === selectedDate
          }"
          @click="selectDay(day)"
        >

          <span v-if="day.date">
            {{ toPersianNumber(day.date) }}
          </span>

          <span
            v-if="day.isToday"
            class="today-indicator"
          ></span>

        </button>

      </div>

      <!-- Selected date -->
      <div class="selected-date">

        <div class="selected-icon">
          <UIcon name="i-lucide-calendar-days" />
        </div>

        <div class="selected-info">

          <span>
            تاریخ انتخاب شده
          </span>

          <strong>
            {{ selectedDateText }}
          </strong>

        </div>

        <div class="selected-arrow">
          <UIcon name="i-lucide-check" />
        </div>

      </div>

    </div>
  </div>
</template>


<script setup lang="ts">

import moment from "jalali-moment"


interface CalendarDay {
  date: number | null
  currentMonth: boolean
  isToday: boolean
  fullDate: string | null
}


/* Month names */

const monthNames = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند"
]


/*Week days*/

const weekDays = [
  "ش",
  "ی",
  "د",
  "س",
  "چ",
  "پ",
  "ج"
]


/*Today*/

const today = moment().locale("fa")


/*Current calendar state*/

const currentYear = ref(today.jYear())

const currentMonth = ref(today.jMonth())


/*Selected date*/

const selectedDate = ref<string>(
  today.format("jYYYY-jMM-jDD")
)


/*Year picker*/

const showYearPicker = ref(false)


/*Available years*/

const years = computed(() => {

  const startYear = today.jYear() - 10

  const endYear = today.jYear() + 10

  return Array.from(
    {
      length:
        endYear - startYear + 1
    },
    (_, index) =>
      startYear + index
  )

})


/*Month name*/

const monthName = computed(() => {

  return monthNames[
    currentMonth.value
  ]

})


/*Today's date text*/

const todayDate = computed(() => {

  return `${toPersianNumber(
    today.jDate()
  )} ${
    monthNames[
      today.jMonth()
    ]
  } ${
    toPersianNumber(
      today.jYear()
    )
  }`

})


/*Selected date text*/

const selectedDateText = computed(() => {

  const date = moment(
    selectedDate.value,
    "jYYYY-jMM-jDD"
  )

  return `${toPersianNumber(
    date.jDate()
  )} ${
    monthNames[
      date.jMonth()
    ]
  } ${
    toPersianNumber(
      date.jYear()
    )
  }`

})


/*Calendar days*/

const calendarDays =
  computed<CalendarDay[]>(() => {

    const firstDay = moment()
      .jYear(currentYear.value)
      .jMonth(currentMonth.value)
      .jDate(1)


    const daysInMonth =
      firstDay.jDaysInMonth()




    const firstDayOfWeek =
      (firstDay.day() + 1) % 7


    const days: CalendarDay[] = []




    for (
      let i = 0;
      i < firstDayOfWeek;
      i++
    ) {

      days.push({

        date: null,

        currentMonth: false,

        isToday: false,

        fullDate: null

      })

    }




    for (
      let day = 1;
      day <= daysInMonth;
      day++
    ) {

      const date = moment()
        .jYear(currentYear.value)
        .jMonth(currentMonth.value)
        .jDate(day)


      const fullDate =
        date.format(
          "jYYYY-jMM-jDD"
        )


      const isToday =
        date.jYear() ===
          today.jYear() &&

        date.jMonth() ===
          today.jMonth() &&

        date.jDate() ===
          today.jDate()


      days.push({

        date: day,

        currentMonth: true,

        isToday,

        fullDate

      })

    }


    return days

  })


/*Previous month*/

function previousMonth() {

  if (
    currentMonth.value === 0
  ) {

    currentMonth.value = 11

    currentYear.value--

  } else {

    currentMonth.value--

  }

}


/*Next month*/

function nextMonth() {

  if (
    currentMonth.value === 11
  ) {

    currentMonth.value = 0

    currentYear.value++

  } else {

    currentMonth.value++

  }

}


/*Select day*/

function selectDay(
  day: CalendarDay
) {

  if (
    !day.currentMonth ||
    !day.fullDate
  ) {

    return

  }


  selectedDate.value =
    day.fullDate

}


/*Select year*/

function selectYear(
  year: number
) {

  currentYear.value = year

  showYearPicker.value = false

}


/*Go to today*/

function goToToday() {

  currentYear.value =
    today.jYear()

  currentMonth.value =
    today.jMonth()

  selectedDate.value =
    today.format(
      "jYYYY-jMM-jDD"
    )

  showYearPicker.value = false

}


/*Persian numbers*/

function toPersianNumber(
  value: number | string
) {

  return String(value)
    .replace(/\d/g, (digit) => {

      return "۰۱۲۳۴۵۶۷۸۹"[
        Number(digit)
      ]

    })

}

</script>


<style scoped>

/*Calendar wrapper*/

.calendar-wrapper {

  width: 100%;

  display: flex;

  justify-content: center;

  padding: 20px;

}


/*Main calendar*/

.calendar {

  position: relative;

  width: 100%;

  max-width: 440px;

  overflow: visible;

  padding: 24px;

  border:
    1px solid
    rgba(255, 255, 255, 0.45);

  border-radius: 32px;

  background:
    linear-gradient(
      145deg,
      rgba(255, 255, 255, 0.72),
      rgba(255, 255, 255, 0.32)
    );

  backdrop-filter: blur(30px);

  -webkit-backdrop-filter: blur(30px);

  box-shadow:
    0 30px 80px
      rgba(15, 23, 42, 0.12),

    inset 0 1px 0
      rgba(255, 255, 255, 0.7);

  isolation: isolate;

}


/*Decorative glow*/

.glass-orb {

  position: absolute;

  z-index: -1;

  width: 180px;

  height: 180px;

  border-radius: 999px;

  filter: blur(55px);

  pointer-events: none;

}


.glass-orb-one {

  top: -100px;

  right: -70px;

  background:
    rgba(99, 102, 241, 0.22);

}


.glass-orb-two {

  bottom: -120px;

  left: -80px;

  background:
    rgba(168, 85, 247, 0.18);

}


/*Header*/

.calendar-top {

  display: flex;

  align-items: center;

  justify-content: space-between;

  margin-bottom: 28px;

}


.calendar-label {

  margin-bottom: 5px;

  font-size: 12px;

  font-weight: 700;

  color:
    rgba(71, 85, 105, 0.65);

}


.calendar-today {

  font-size: 20px;

  font-weight: 900;

  letter-spacing: -0.5px;

  color: #111827;

}


/*Today button*/

.calendar-today-button {

  display: flex;

  align-items: center;

  gap: 8px;

  padding: 9px 13px;

  border:
    1px solid
    rgba(255, 255, 255, 0.65);

  border-radius: 14px;

  background:
    rgba(255, 255, 255, 0.38);

  color: #475569;

  font-size: 12px;

  font-weight: 800;

  backdrop-filter: blur(12px);

  cursor: pointer;

  transition:
    transform 0.2s ease,
    background 0.2s ease;

}


.calendar-today-button:hover {

  transform:
    translateY(-2px);

  background:
    rgba(255, 255, 255, 0.6);

}


.today-dot {

  width: 7px;

  height: 7px;

  border-radius: 50%;

  background: #6366f1;

  box-shadow:
    0 0 0 4px
    rgba(99, 102, 241, 0.12);

}


/*Navigation*/

.calendar-navigation {

  display: flex;

  align-items: center;

  justify-content: space-between;

  margin-bottom: 22px;

}


.navigation-button {

  display: flex;

  align-items: center;

  justify-content: center;

  width: 40px;

  height: 40px;

  border:
    1px solid
    rgba(255, 255, 255, 0.55);

  border-radius: 13px;

  background:
    rgba(255, 255, 255, 0.35);

  color: #475569;

  backdrop-filter: blur(10px);

  cursor: pointer;

  transition:
    transform 0.2s ease,
    background 0.2s ease;

}


.navigation-button:hover {

  transform:
    scale(1.06);

  background:
    rgba(255, 255, 255, 0.65);

}


/*Month title*/

.month-title {

  display: flex;

  align-items: center;

  gap: 7px;

}


.month-title > span {

  font-size: 18px;

  font-weight: 900;

  color: #111827;

}


/*Year picker wrapper*/

.year-picker-wrapper {

  position: relative;

}


/*Year button*/

.year-button {

  display: flex;

  align-items: center;

  gap: 5px;

  padding: 4px 8px;

  border:
    1px solid
    rgba(255, 255, 255, 0.42);

  border-radius: 9px;

  background:
    rgba(255, 255, 255, 0.42);

  color: #64748b;

  font-size: 11px;

  font-weight: 800;

  cursor: pointer;

  backdrop-filter: blur(12px);

  transition:
    transform 0.2s ease,
    background 0.2s ease,
    box-shadow 0.2s ease;

}


.year-button:hover {

  transform:
    translateY(-1px);

  background:
    rgba(255, 255, 255, 0.65);

  box-shadow:
    0 8px 20px
    rgba(15, 23, 42, 0.08);

}


/*Chevron*/

.year-chevron {

  display: inline-block;

  font-size: 13px;

  transition:
    transform 0.25s ease;

}


.year-chevron-open {

  transform:
    rotate(180deg);

}


/*Year picker*/

.year-picker {

  position: absolute;

  top: calc(100% + 10px);

  right: 50%;

  z-index: 100;

  width: 190px;

  transform:
    translateX(50%);

  padding: 10px;

  border:
    1px solid
    rgba(255, 255, 255, 0.55);

  border-radius: 18px;

  background:
    linear-gradient(
      145deg,
      rgba(255, 255, 255, 0.88),
      rgba(255, 255, 255, 0.55)
    );

  backdrop-filter: blur(25px);

  -webkit-backdrop-filter: blur(25px);

  box-shadow:
    0 20px 50px
      rgba(15, 23, 42, 0.15),

    inset 0 1px 0
      rgba(255, 255, 255, 0.75);

}


/*Year picker header*/

.year-picker-header {

  padding:
    7px 8px 10px;

  margin-bottom: 6px;

  border-bottom:
    1px solid
    rgba(148, 163, 184, 0.15);

  font-size: 11px;

  font-weight: 900;

  color: #64748b;

}


/*Years list*/

.year-list {

  display: grid;

  grid-template-columns:
    repeat(3, 1fr);

  gap: 5px;

  max-height: 210px;

  overflow-y: auto;

  padding-right: 2px;

}


/*Scrollbar*/

.year-list::-webkit-scrollbar {

  width: 4px;

}


.year-list::-webkit-scrollbar-track {

  background: transparent;

}


.year-list::-webkit-scrollbar-thumb {

  background:
    rgba(99, 102, 241, 0.25);

  border-radius: 999px;

}


/*Year item*/

.year-item {

  height: 34px;

  border:
    1px solid transparent;

  border-radius: 10px;

  background:
    rgba(255, 255, 255, 0.25);

  color: #475569;

  font-size: 11px;

  font-weight: 800;

  cursor: pointer;

  transition:
    transform 0.18s ease,
    background 0.18s ease,
    color 0.18s ease,
    box-shadow 0.18s ease;

}


.year-item:hover {

  transform:
    translateY(-1px);

  background:
    rgba(255, 255, 255, 0.65);

  color: #4f46e5;

}


.year-item-active {

  color: white;

  background:
    linear-gradient(
      145deg,
      rgba(99, 102, 241, 0.95),
      rgba(79, 70, 229, 0.82)
    );

  border-color:
    rgba(255, 255, 255, 0.55);

  box-shadow:
    0 7px 18px
      rgba(79, 70, 229, 0.22);

}


/*Year picker animation*/

.year-picker-enter-active,
.year-picker-leave-active {

  transition:
    opacity 0.22s ease,
    transform 0.22s ease;

}


.year-picker-enter-from,
.year-picker-leave-to {

  opacity: 0;

  transform:
    translateX(50%)
    translateY(-8px)
    scale(0.96);

}


.year-picker-enter-to,
.year-picker-leave-from {

  opacity: 1;

  transform:
    translateX(50%)
    translateY(0)
    scale(1);

}


/*Weekdays*/

.weekdays,
.days-grid {

  display: grid;

  grid-template-columns:
    repeat(7, 1fr);

  gap: 6px;

}


.weekdays {

  margin-bottom: 8px;

}


.weekday {

  text-align: center;

  padding: 7px 0;

  font-size: 11px;

  font-weight: 800;

  color: #94a3b8;

}


/*Days*/

.day {

  position: relative;

  display: flex;

  align-items: center;

  justify-content: center;

  aspect-ratio: 1;

  border:
    1px solid transparent;

  border-radius: 15px;

  background: transparent;

  color: #334155;

  font-size: 13px;

  font-weight: 700;

  cursor: pointer;

  transition:
    transform 0.18s ease,
    background 0.18s ease,
    border-color 0.18s ease,
    box-shadow 0.18s ease;

}


.day:not(:disabled):hover {

  transform:
    translateY(-2px);

  background:
    rgba(255, 255, 255, 0.6);

  border-color:
    rgba(255, 255, 255, 0.8);

  box-shadow:
    0 8px 20px
      rgba(15, 23, 42, 0.08);

}


.day-empty {

  pointer-events: none;

}


.day-today {

  color: #4f46e5;

  background:
    rgba(99, 102, 241, 0.08);

  border-color:
    rgba(99, 102, 241, 0.15);

}


.day-selected {

  transform:
    scale(1.04);

  color: white !important;

  border-color:
    rgba(255, 255, 255, 0.65);

  background:
    linear-gradient(
      145deg,
      rgba(99, 102, 241, 0.95),
      rgba(79, 70, 229, 0.82)
    );

  box-shadow:
    0 10px 25px
      rgba(79, 70, 229, 0.28),

    inset 0 1px 0
      rgba(255, 255, 255, 0.3);

}


.today-indicator {

  position: absolute;

  bottom: 5px;

  width: 4px;

  height: 4px;

  border-radius: 50%;

  background: currentColor;

}


/*Selected date*/

.selected-date {

  display: flex;

  align-items: center;

  gap: 12px;

  margin-top: 22px;

  padding: 13px;

  border:
    1px solid
    rgba(255, 255, 255, 0.55);

  border-radius: 18px;

  background:
    rgba(255, 255, 255, 0.32);

  backdrop-filter: blur(14px);

}


.selected-icon {

  display: flex;

  align-items: center;

  justify-content: center;

  width: 40px;

  height: 40px;

  flex-shrink: 0;

  border-radius: 13px;

  background:
    rgba(99, 102, 241, 0.1);

  color: #6366f1;

}


.selected-info {

  display: flex;

  flex-direction: column;

  min-width: 0;

}


.selected-info span {

  margin-bottom: 3px;

  font-size: 10px;

  font-weight: 700;

  color: #94a3b8;

}


.selected-info strong {

  font-size: 13px;

  font-weight: 900;

  color: #334155;

}


.selected-arrow {

  display: flex;

  align-items: center;

  justify-content: center;

  width: 28px;

  height: 28px;

  margin-right: auto;

  border-radius: 9px;

  background:
    rgba(255, 255, 255, 0.45);

  color: #6366f1;

}


/*Mobile*/

@media (max-width: 480px) {

  .calendar-wrapper {

    padding: 10px;

  }


  .calendar {

    padding: 18px;

    border-radius: 26px;

  }


  .calendar-today {

    font-size: 17px;

  }


  .month-title > span {

    font-size: 16px;

  }


  .day {

    border-radius: 12px;

    font-size: 12px;

  }


  .weekdays,
  .days-grid {

    gap: 4px;

  }


  .year-picker {

    width: 175px;

  }

}

</style>
```
