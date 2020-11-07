<template>
          <form id="Infos" novalidate class="md-layout" @submit.prevent="validerCommande($event)">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Informations de commande</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">


            <div class="md-layout-item md-small-size-100">
              <md-field >
                <label for="nom">Nom</label>

                <md-input name="nom"  />
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field >
                <label for="prenom">Prénom</label>
                <md-input name="prenom"  />
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field >
                <label for="adresse">Adresse</label>
                <md-input name="adresse"  />
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field >
                <label for="cp">Code postal</label>
                <md-input name="cp"  />
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field >
                <label for="email">Adresse Email</label>
                <md-input name="email"  />
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field >
                <label for="email">Numéro de téléphone</label>
                <md-input name="email"  />
              </md-field>
            </div>

          </div>

        </md-card-content>


        <md-card-actions>
          <md-button type="submit" class="md-primary" v-if="retour== false" >Valider la commande </md-button>
          <router-link :to="'/' "><md-button class="md-primary" v-if="retour == true" >Retour à la page d'accueil </md-button></router-link>
        </md-card-actions>
      </md-card>

    </form>
    
</template>

<script>

export default {
  name: "Commande",
  
  computed: {
  },
  data: function () {
    return {
      retour: false,
    };
  },
  methods: {
      validerCommande(event) {
      // Pour éviter que la page ne se ré-affiche
      event.preventDefault();
      

      this.$alert("Nous vous remercions pour votre commande ! Vous serez livré à l'adresse indiquée. Nous vous contacterons par téléphone une fois sur place. Tous moyens de paiement acceptés lors de la remise de votre commande.");
      this.retour = true;
      }
  },
  created() {
  },
 
  
}
</script>

<style scoped>
#Infos{
  
  width: 50%;
  margin: 0 auto;
  box-shadow: 0px 0px 12px #414141;
  background-color: white;
  margin-top: 3%;

}
.md-layout-item {
  width: 100%;
}
</style>