<template>
  <header>
    <h1>Mogul</h1>
    <p class="description">
      evaluates λ-calculations step by step.
    </p>
  </header>
</template>

<style scoped>
header {
  display: flex;
  align-items: flex-end;

  padding: 1px 0;

  background-image: linear-gradient(to right top, #e96, #ee8166);
}

h1 {
  margin: .06em .4em .2em;

  /* color: #e96; */
  color: #fff;
  font-size: 36px;
  font-weight: 400;
  font-family: 'Yellowtail', cursive;
  line-height: 1.15;
}

p {
  margin: 0;
  margin-bottom: 14px;

  /* color: #e96; */
  color: #fff;
  font-size: 12px;
}
</style>
