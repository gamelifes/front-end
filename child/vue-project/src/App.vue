<template>
  <div id="app">
    <div id="nav">
      <router-link to="/home">Home</router-link>
      |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>
<script>
	import action from '@/qiankun/action';
	
	export default {
		data() {
		  return {
		   
		  };
		},
		created() {
			
		},
	mounted() {
		 // 接收state
		 // if(action.actions.baseroute){ 
			// this.$router.replace({ name: action.actions.baseroute })		
		 // }
		action.onGlobalStateChange((state) => {
			 console.log(state)
 
		}, true);
	},
	}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding-bottom: 20px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
