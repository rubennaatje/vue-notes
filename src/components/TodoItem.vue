<template>
  <v-list-item :key="`${todo.title}`">
    <v-list-item-action>
      <v-checkbox @change="toggle"
      :input-value="todo.done"
      :checked="checked"
      :color="todo.done && 'grey' || 'primary'">
        <template v-slot:label>
          <div
            :class="todo.done && 'grey--text' || 'primary--text'"
            class="ml-4"
            v-text="todo.title"
          ></div>
        </template>
      </v-checkbox>
    </v-list-item-action>

    <v-spacer></v-spacer>

    <v-scroll-x-transition>
      <v-icon v-if="todo.done" color="success">Gedaan</v-icon>
    </v-scroll-x-transition>

    <v-list-item-action>
       <v-icon @click="deleteTodo">mdi-delete</v-icon>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import mdiDelete from '@mdi/js';

export default {
  name: 'todo',
  props: ['todo'],
  methods: {
    toggle() {
      this.$store.dispatch('toggle', this.todo);
    },
    deleteTodo() {
      this.$store.dispatch('removeTodo', this.todo.id);
    },
  },
  computed: {
    checked() {
      if (this.todo.done) {
        return 'checked';
      }
      return 'unchecked';
    },
  },
  data: () => ({
    icons: {
      mdiDelete,
    },
  }),
};
</script>
