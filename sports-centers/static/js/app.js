const Centers = {template: '<centers></centers>' }
const Login = {template: '<login></login>'}

const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/', component: Centers},
		{ path: '/log', component:Login},
	  ]
});

var app = new Vue({
	router,
	el: '#app',
	data:{
		login:'',
		username:''
	}
});
