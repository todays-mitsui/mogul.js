<template>
  <header>
    <h1><nuxt-link to="/">Mogul</nuxt-link></h1>
    <p class="description">
      evaluates λ-calculations step by step.
    </p>

    <nav>
      <ul>
        <li>
          <a href="https://github.com/todays-mitsui/mogul.js" target="_blank">
            <github-sign class="icon" />
            <span class="text">Github</span>
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import GithubSign from '~/assets/img/github_sign.svg'

export default {
  components: {
    GithubSign
  }
}
</script>

<style scoped>
header {
  display: flex;

  height: 60px;

  background-image: linear-gradient(to right top, #e96, #ee8166);
}

a {
  color: inherit;
  text-decoration: none;
}

h1 {
  height: 100%;
  margin: 0 0.4em;
  padding: 10px 0;

  color: #fff;
  font-size: 36px;
  font-weight: 400;
  font-family: 'Yellowtail', cursive;
  line-height: 40px;
}

p {
  height: 100%;
  margin: 0;
  padding: 10px 0;

  color: #fff;
  font-size: 12px;
  line-height: 40px;
}

nav {
  flex-grow: 1;
}
nav ul {
  float: right;

  display: flex;

  height: 100%;
  margin: 0;
  padding: 0;
}

nav li {
  height: 100%;

  font-weight: 700;
  line-height: 60px;

  border-left: 1px solid #fff;
}
nav a {
  display: block;
  height: 100%;
  padding: 0 24px;

  color: #fff;
  text-decoration: none;
}
nav a:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.icon {
  display: none;

  width: 24px;
  height: 24px;
}
.icon path {
  fill: #fff;
}

@media screen and (max-width: 760px) {
  h1 {
    font-size: 28px;
  }

  p {
    font-size: 11px;
  }

  nav li {
    border: none;
  }

  nav a {
    padding: 0 16px;
  }

  nav .icon {
    display: inline;
  }

  nav .text {
    display: none;
  }
}
</style>
