<template>
  <div class="hello">
    <h1>{{ msg }} :-))</h1>
    <div class="hello">
      <h4>아이디</h4>
      <input v-model="email" type="text" />
      <h4>패스워드</h4>
      <input v-model="password" type="password" />
      <div>
        <button @click="signUp()">가입하기</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    signUp() {
      this.$store.dispatch("signInAction", {
        email: this.email,
        password: this.password
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
