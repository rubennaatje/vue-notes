<template>
  <v-container style="max-width: 500px">
    <v-text-field
      v-model="task"
      label="What are you working on?"
      solo
      @keydown.enter="create"
    >
      <v-fade-transition v-slot:append>
        <v-icon
          v-if="task"
          @click="create"
        >
          add_circle
        </v-icon>
      </v-fade-transition>
    </v-text-field>

    <h2 class="display-1 success--text pl-4">
      Tasks:&nbsp;
      <v-fade-transition leave-absolute>
        <span :key="`tasks-${todos.length}`">
          {{ todos.length }}
        </span>
      </v-fade-transition>
    </h2>

    <v-divider class="mt-4"></v-divider>

    <v-row
      class="my-1"
      align="center"
    >
      <strong class="mx-4 info--text text--darken-2">
        Remaining: {{ remainingTasks }}
      </strong>

      <v-divider vertical></v-divider>

      <strong class="mx-4 success--text text--darken-2">
        Completed: {{ completedTasks }}
      </strong>

      <v-spacer></v-spacer>

      <v-progress-circular
        :value="progress"
        class="mr-2"
      ></v-progress-circular>
    </v-row>

    <v-divider class="mb-4"></v-divider>

    <v-card v-if="todos.length > 0">
      <v-slide-y-transition
        class="py-0"
        group
        tag="v-list"
      >
        <template v-for="(task, i) in todos">
          <v-divider
            v-if="i !== 0"
            :key="`${i}-divider`"
          ></v-divider>

          <v-list-item :key="`${i}-${task.title}`">
            <v-list-item-action>
              <v-checkbox
                v-model="task.done"
                :color="task.done && 'grey' || 'primary'"
              >
                <template v-slot:label>
                  <div
                    :class="task.done && 'grey--text' || 'primary--text'"
                    class="ml-4"
                    v-text="task.title"
                  ></div>
                </template>
              </v-checkbox>
            </v-list-item-action>

            <v-spacer></v-spacer>

            <v-scroll-x-transition>
              <v-icon
                v-if="task.done"
                color="success"
              >
                check
              </v-icon>
            </v-scroll-x-transition>
          </v-list-item>
        </template>
      </v-slide-y-transition>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    tasks: [
      {
        done: false,
        text: 'Foobar',
      },
      {
        done: false,
        text: 'Fizzbuzz',
      },
    ],
    task: null,
  }),

  computed: {
    completedTasks() {
      return this.todos.filter((task) => task.done).length;
    },
    progress() {
      return (this.completedTasks / this.todos.length) * 100;
    },
    remainingTasks() {
      return this.todos.length - this.completedTasks;
    },
    todos() {
      return this.$store.getters.todos;
    },
  },

  methods: {
    create() {
      const todo = {
        id: Date.now(), title: this.task, content: 'test', done: false,
      };
      this.$store.dispatch('addTodo', todo);

      this.task = null;
    },
  },
  created() {
    this.$store.dispatch('initTodos');
  },
};
</script>
