Vue.component("profile",{
    data: function(){
        return{
            user:{userName:"",password:"",name:"",gender:"",dateOfBirth:"",role:""},
            membershipCost:0,
            visitedCenters:null,
            loyalityPoints: 0,
            type:null
        }
    },
    template:`
    <div>
        <h3>Dobrodosli {{user.userName}}</h3>
        <p>Korisnicko ime: {{user.userName}} </p>
        <p>Ime: {{user.name}}</p>
        <p>Pol: {{user.gender}}</p>
        <p> Datum Rodjenja: {{user.dateOfBirth}}</p>
        <p>p Uloga korisnika: {{user.role}}</p>
    </div>
    `,
    mounted(){
        if(this.$router.app.login && this.$router.app.username){
            switch(this.$router.app.login){
                case "ADMIN":
                    console.log("aadmin");
                    axios.get('rest/getAdmin',{
                        params:{
                            username: String(this.$router.app.username)
                        }
                    })
                        .then(response=>{this.user.userName = response.data.userName;
                                this.user.name = response.data.name;
                                this.user.gender=response.data.gender;
                                this.user.dateOfBirth=response.data.dateOfBirth;
                                this.user.role=response.data.role;
                            });
            }
        }
    }
});