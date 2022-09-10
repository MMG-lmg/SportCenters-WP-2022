Vue.component("vueForbiden",{
    data:function(){
        return{

        }
    },
    template:`
        <div>
            <div class="d-flex flex-column align-items-center justify-content-center mt-5">
                <h2>Pristup stranici nije dozvoljen</h2>
                <div class="d-flex flex-row align-items-center justify-content-center">
                    <button class="btn btn-primary button-green m-2" v-on:click="routeToHome">Pocetna</button>
                    <button class="btn btn-primary button-green m-2" v-on:click="routeToLogin">Prijava</button>
                </div>
            </div>
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