<template>
    
        <!--
        <form @submit.prevent="validerCommande($event)">
          <p>
            <label>
              Nom : <input name="nom" type="text"   />
            </label>
          </p>
          <p>
            <label>
              Prénom : <input name="prenom" type="text"   />
            </label>
          </p>
          <p>
            <label>
              Adresse : <input name="adresse" type="text"   />
            </label>
          </p>
          <p>
            <label>
              Code postal : <input name="cp" type="number"   />
            </label>
          </p>
          <p>
            <label>
              Adresse email : <input name="email" type="text"   />
            </label>
          </p>
          <p><button @click="switchDiv()" >Commander</button></p>
        </form>

-->








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
          <md-button type="submit" class="md-primary" >Valider la commande</md-button>
        </md-card-actions>
      </md-card>

      <md-snackbar >The user was saved with success!</md-snackbar>
    </form>
    
</template>

<script>

export default {
  name: "Commande",
  
  computed: {
  },
  data: function () {
    return {
    };
  },
  methods: {
      validerCommande(event) {
      // Pour éviter que la page ne se ré-affiche
      event.preventDefault();

      // Récupération du formulaire. Pas besoin de document.querySelector
      // ou document.getElementById puisque c'est le formulaire qui a généré
      // l'événement


      // let form = event.target;  A REACTIVER QUAND UTILISE
      // Récupération des valeurs des champs du formulaire
      // en prévision d'un envoi multipart en ajax/fetch

        
      //let donneesFormulaire = new FormData(event.target); A REACTIVER QUAND UTILISE

      //let mail = form.email.value;  A REACTIVER QUAND UTILISE
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