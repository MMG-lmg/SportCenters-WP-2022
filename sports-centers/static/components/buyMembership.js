Vue.component("buyMembership",{
    data:function(){
        return{
            membershipOffers:null,
            newMembership:null,
            feedback:"",
            existingMembership:null
        }
    },
    template:`
        <div>
            <p>{{feedback}}</p>
            <h3>Ponuda clanarina</h3>
            <div v-if="membershipOffers" v-for="offer in membershipOffers" @click="selectedOffer(offer)">
                <p>Opis:{{offer.description}}</p>
                <p>{{offer.type}},Broj poseta:{{offer.numOfVisits}}</p>
                <p>Cena:{{offer.price}}</p>
            </div>
            
            <div v-if="newMembership">
                <div v-if="existingMembership">
                    <p>Paznja postoji uplacena aktivna clanarina, kupovinom nove prestaje vazenje stare</p>
                    <p>Opis:{{existingMembership.description}}</p>
                    <p>{{existingMembership.type}}Broj poseta:{{existingMembership.numOfVisits}}</p>
                    <p>Cena:{{existingMembership.price}}</p>
                    <p>Clanarina vazi od {{existingMembership.payDate}} do {{existingMembership.validDue}}</p>
                </div>
                <br>
                <p>Nova clanarina</p>
                <p>Opis:{{newMembership.description}}</p>
                <p>{{newMembership.type}}Broj poseta:{{newMembership.numOfVisits}}</p>
                <p>Cena:{{newMembership.price}}</p>
                <p>Clanarina vazi od {{newMembership.payDate}} do {{newMembership.validDue}}</p>
                <button @click="buyMembership">Kupi</button>
            </div>
        </div>
    `,
    mounted(){
        axios.get('rest/loginCheck').then(response=>{
            if(response.data == null){
                router.push(`/403`);
            }
            else{
				this.$router.app.username = response.data.userName;
                this.$router.app.login = response.data.role;
                if(this.$router.app.login!="CUSTOMER"){
                    router.push(`/403`);
                }
            }
        });

        axios.get('rest/Membership/Offers/getAll')
        .then(response=>{
            if(response.data!="FAILIURE"){
                this.membershipOffers = response.data;
            }
            else{
                this.feedback="Nema ponuda";
            }
        });

        axios.get('rest/Membership/getActive',
        {
            params: {username:this.$router.app.username}
        })
        .then(response=>{
            if(response.data!="FAILIURE"){
                this.existingMembership = response.data;
            }
        });
    },
    methods:{
        selectedOffer: function(offer){
            this.newMembership = offer;
            let currentDate =new Date();
            this.newMembership.payDate = currentDate.getFullYear() +"-"+(currentDate.getMonth()+1)+"-"+currentDate.getDate();
            switch(this.newMembership.type){
                case "ANNUAL":
                    this.newMembership.validDue = currentDate.getFullYear()+1 +"-"+(currentDate.getMonth()+1)+"-"+currentDate.getDate();
                    break;
                case "MONTHLY":
                    this.newMembership.validDue = currentDate.getFullYear() +"-"+ (currentDate.getMonth()+2) +"-"+currentDate.getDate();
                    break;
                case "WEEKLY":
                    this.newMembership.validDue = currentDate.getFullYear() +"-"+(currentDate.getMonth()+1)+"-"+ (currentDate.getDate()+7);
                    break;
            }
            this.newMembership.status = "ACTIVE";
            this.newMembership.customerUsername = this.$router.app.username;
        },
        buyMembership:function(){
            axios.post('rest/Membership/add',this.newMembership)
            .then(res=>{
                if(res.data!="SUCCESS"){
                    this.feedback="Neuspesna kupovina!";
                }
                else{
                    this.feedback="Clanarina uspesno kupljena";
                    this.newMembership = null;
                    setTimeout(() => {  router.push(`/`) }, 1500);
                }
            });
        }
    }

});