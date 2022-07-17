const Centers = {template: '<centers></centers>' }
const Login = {template: '<login></login>'}
const Register ={template: '<register></register>'}
const RegisterCoach={template: '<registerCoach></registerCoach>'}

const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/', component: Centers},
		{ path: '/login', component:Login},
		{ path: '/register', component:Register},
		{ path: '/register/coach', component:RegisterCoach},
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
