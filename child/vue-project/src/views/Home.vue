<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png"/>
    <HelloWorld msg="Vue.js Demo"/>

    <el-button @click="dialogVisible = true" type="text">Open Dialog</el-button>

    <el-dialog
      :before-close="handleClose"
      :visible.sync="dialogVisible"
      title="Dialog"
      width="30%">
      <span>dialog message</span>
      <span class="dialog-footer" slot="footer">
        <el-button @click="dialogVisible = false">cancel</el-button>
        <el-button @click="handleOk" type="primary">ok</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
  // @ is an alias to /src
  import HelloWorld from '@/components/HelloWorld.vue';
	import action from '@/qiankun/action';
	
  export default {
    name: 'home',
    components: {
      HelloWorld,
    },
    data() {
      return {
        dialogVisible: false,
      };
    },
		mounted() {
			 // 接收state
		action.onGlobalStateChange((state) => {
				console.log(state)
		}, true);
		},
    methods: {
			changeValue(){
					// 修改state
				action.setGlobalState({abc:789})
				this.$router.push({path:'/'})
			},
			handleOk(){
				action.setGlobalState({abc:789})
				 window.history.pushState({}, '', '/home')
			},
      handleClose(done) {
        this.$confirm('Sure to close？')
          .then(_ => {
					
            done();
          })
          .catch(_ => {
          });
      },
    },
  };
</script>
