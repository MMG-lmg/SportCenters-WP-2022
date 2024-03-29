const Centers = {template: '<centers></centers>' }
const Login = {template: '<login></login>'}
const Register ={template: '<register></register>'}
const RegisterCoach={template: '<registerCoach></registerCoach>'}
const RegisterManager={template: '<registerManager></registerManager>'}
const Profile={template: '<profile></profile>'}
const Profiles={template: '<profiles></profiles>'}
const Center={template:'<center></center>'}
const addCenter={template:'<addCenter></addCenter>'}
const membershipOffers={template:'<membershipOffers></membershipOffers>'}
const buyMembership={template:'<buyMembership></buyMembership>'}
const scheduleTraining={template:'<scheduleTraining></scheduleTraining>'}
const vueForbiden={template:'<vueForbiden></vueForbiden>'}


const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/', component: Centers},
		{ path: '/login', component:Login},
		{ path: '/register', component:Register},
		{ path: '/register/coach', component:RegisterCoach},
		{ path: '/register/manager', component:RegisterManager},
		{ path: '/profile', component:Profile},
		{ path: '/admin/profiles', component:Profiles},
		{ path: '/admin/addCenter', component:addCenter},
		{ path: '/admin/offers', component:membershipOffers},
		{ path: '/manager/center', component:Center},
		{ path: '/customer/buyMembership', component:buyMembership},
		{ path: '/customer/scheduleTraining/:trainingId', component:scheduleTraining},
		{ path: '/403', component:vueForbiden}
	  ]
});

var app = new Vue({
	router,
	el: '#app',
	data:{
		login:'',
		username:'',
	}
});
