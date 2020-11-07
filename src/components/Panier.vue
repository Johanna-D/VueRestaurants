<template>
    <div id="Panier">


      <md-table >
        <md-table-toolbar>
          <div class="md-toolbar-section-start">
            <h1 class="md-title">Panier</h1>
          </div>
        </md-table-toolbar>

        
        <md-table-row v-for="r of articles" :key="r">

          <md-table-cell md-label="nom" >
            {{r[0]}}
          </md-table-cell>
          <md-table-cell md-label="prix" >
            {{r[1]}}
          </md-table-cell>
          <md-table-cell md-label="prix" >
            <md-button @click="ajouterArticle(r)"><md-icon>add_circle_outline</md-icon></md-button>

          </md-table-cell>
          <md-table-cell md-label="annuler" >
            <md-button @click="supprimerArticle(r)"><md-icon>delete_outline</md-icon></md-button>
          </md-table-cell>
          
        </md-table-row>
      </md-table>

      <p>Total : {{totalPanier}} € </p>
      <router-link :to="'/commande' "><md-button>Commander</md-button></router-link
            >
    
     

   </div>
</template>

<script>
export default {
    name:"Panier",
    data: function () {
    return {
        articles: null,
        totalPanier: 0,
    }
    },
    created(){
        this.articles = this.$route.params.articles;
        for( var i=0; i < this.articles.length; i++){
            this.totalPanier += this.articles[i][1];

        }
    },
    methods: {
        supprimerArticle(article){
        if(this.articles != null){
            this.totalPanier -= article[1];
            let index = this.articles.indexOf(article);
            this.articles.splice(index,1);
        

      }
      
      
    },
    ajouterArticle(article){
        this.articles.push(article);
        this.totalPanier += article[1];
      }
    }
}
</script>

<style scoped>
template {
    width: 100%;
    height: 100%
}
#Panier {
  width: 50%;
  background-color: white;
  margin: 0 auto;
  padding-left: 40px;
  padding-right: 40px;
  box-shadow: 0px 0px 12px #414141;
  margin-top: 3%;
}
</style>