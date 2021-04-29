<template>
  <div class="locale-changer">
    <select v-model="$i18n.locale">
      <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">{{ name[locale] || locale }}</option>
    </select>
  </div>
</template>

<script>
export default {
    data() {
        return {
            name: {
                'fr': 'Français',
                'rs': 'Српски',
                'en': 'English'
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .locale-changer {
        position: absolute;
        right: 10px;

        select, option {
            cursor: pointer;
        }
    }
</style>