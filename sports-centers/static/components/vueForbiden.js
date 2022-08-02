Vue.component("vueForbiden",{
    data:function(){
        return{

        }
    },
    template:`
        <div>
            <h1>Pristup stranici nije dozvoljen</h1>
            <button v-on:click="routeToHome">Pocetna</button>
            <button v-on:click="routeToLogin">Prijava</button>
        </div>
    `,
    mounted(){

    },
    methods: {
        routeToHome(){
			router.push(`/`);
        },
        routeToLogin(){
			router.push(`/login`);
        },
    },
});