const Centers = { template: '<centers></centers>' }

const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/', name: 'home', component: Centers}
	  ]
});

var app = new Vue({
	router,
	el: '#centers'
});