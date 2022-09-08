Vue.component("membershipOffers",{
    data:function(){
        return{
            listedOffers:null,
            add:false,
            feedback:"",
            /*this.description = description;
            this.type = type;
            this.price = price;
            this.dailyVisits = dailyVisits;*/
            newOffer:{membershipOfferId:"",description:"",type:null,price:0.0,numOfVisits:0},
        }
    },
    template:`
        <div>
            <div class="container pt-1 pb-1">
                <h3>Postojece ponude</h3>
                <div class="d-flex flex-wrap">
                    <div class="background-Green m-2 p-2 w-25 rounded text-truncate" v-if="listedOffers" v-for="offer in listedOffers">
                        <p>{{offer.membershipOfferId}}</p>
                        <p class="text-wrap">Opis:{{offer.description}}</p>
                        <p>Tip:{{typeToString(offer.type)}}</p>
                        <p>Broj poseta:{{offer.numOfVisits}}</p>
                        <p>Cena:{{offer.price}}</p>
                    </div>
                </div>
                <button class="btn btn-primary mb-1 button-green" type="button" data-bs-toggle="collapse" data-bs-target="#collapseAdd" aria-expanded="false" aria-controls="collapseAdd">
				    <span>Dodavanje ponude</span>
			    </button>
                <div class="collapse" id="collapseAdd">
                    <h3 class="m-1">Dodavanje</h3>
                    <div class="d-lg-flex mt-2 mb-2">
                        <div class=" input-group m-1">	
                            <span class="input-group-text">Opis:</span>
                            <input type="text" name="desc" v-model="newOffer.description" class="form-control"></input>
                        </div>	

                        <div class=" input-group m-1">	
                            <span class="input-group-text">Tip:</span>
                            <select name="type" class="form-select" v-model="newOffer.type">
                                <option value="ANNUAL">Godisnja</option>
                                <option value="MONTHLY">Mesecna</option>
                                <option value="WEEKLY">Nedeljna</option>
                            </select>
                        </div>
                        
                        <div class=" input-group m-1">	
                            <span class="input-group-text">Cena:</span>
                            <input type="text" name="price" v-model="newOffer.price" class="form-control"></input>
                        </div>

                        <div class=" input-group m-1">	
                            <span class="input-group-text">Broj poseta:</span>
                            <input type="number" name="visits" v-model="newOffer.numOfVisits" class="form-control"></input>
                        </div>
                    </div>
                        <button class="btn btn-primary button-green" @click="this.addOffer">Dodaj</button>
                        <button class="btn btn-primary button-green" data-bs-toggle="collapse" data-bs-target="#collapseAdd" aria-expanded="false" aria-controls="collapseAdd" @click="this.cancelAdd">Odustani</button>
                </div>
                <div v-if="feedback" class="alert alert-warning alert-dismissible fade show mt-2" role="alert">
                    <p>{{feedback}}</p>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
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
                if(this.$router.app.login!="ADMIN"){
                    router.push(`/403`);
                }
            }
        });

        axios.get('rest/Membership/Offers/getAll')
        .then(response=>{
            if(response.data!="FAILIURE"){
                this.listedOffers = response.data;
            }
            else{
                this.feedback="Nema ponuda, sto ne bi dodali neku?";
            }
        });
    },
    methods:{
        typeToString: function(type){
            switch (type){
                case "ANNUAL":
                    return "Godisnja";
                case "MONTHLY":
                    return "Mesecna";
                case "WEEKLY":
                    return "Nedeljna";
            }
                
        },
        addOffer: function(){
            axios.post('rest/Membership/Offers/add',this.newOffer)
            .then(res=>{
                if(res.data==="FAILIURE"){
                    this.feedback="Greska, dodavanje Neuspesno!";
                }
                else{
                    this.feedback="Uspesno dodata ponuda";
                    this.clearOffer();
                    setTimeout(() => {  router.push(`/`) }, 1500);
                }
            });
        },
        cancelAdd:function(){
            this.clearOffer();
            this.add=false;
        },
        clearOffer:function(){
            this.newOffer.description="";
            this.newOffer.type=null;
            this.newOffer.price=0.0;
            this.newOffer.numOfVisits=0;
        }
    }
});