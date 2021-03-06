class P4{
    constructor(selector){
        this.col =7;
        this.row =6;
        this.selector=selector;
        this.player='rouge';
        this.compteurjaune=0;
        this.compteurrouge=0;
        this.plateau();
        this.affiche();
        this.gagnant();
        this.points();

    }




    // Affiche le plateau 
    plateau(){  
        const $jeu = $(this.selector);
        for(let row=0;row < this.row;row++){        
            const $row =$('<div>').addClass('row');
            for (let col=0;col<this.col;col++){
                const $col = $('<div>').addClass('col empty').attr("data-col",col).attr("data-row",row);
                $row.append($col);
            }
            $jeu.append($row)
        }
    }

    points(){
        const $row =$('<div>').addClass('row');
        const compteurptsrouge = $('<div>').addClass('cptrouge');
        $row.append(compteurptsrouge);
        
    }
    

    affiche(){

        const $jeu=$(this.selector);
        const that=this;


        //parcours de colonne pour afficher la premiere case libre 

        function casePossible(col){

            const $cells = $(`.col[data-col='${col}']`);

            for(let i=$cells.length-1; i>=0;i--){

                const $cell = $($cells[i]);
                if($cell.hasClass('empty')){
                    return $cell;
                }
            }
            return null;
        }

        // permet de voir la case en ayant la souris sur la colonne
        $jeu.on('mouseenter','.col.empty',function(){
            const $col= $(this).data('col')
            const $last= casePossible($col);
            if($last !=null){
                $last.addClass(`p${that.player}`);
            }

        });

        // enlève la prévisu
        $jeu.on('mouseleave','.col',function(){
            $('.col').removeClass(`p${that.player}`);
        });

        // dépose un pion de la couleur du joueur
        $jeu.on('click','.col.empty',function(){
            const col = $(this).data('col');
            const $last = casePossible(col);
            $last.addClass(`${that.player}`).removeClass(`empty p${that.player}`).data('player',`${that.player}`);

            

            // vérifie si il y a un gagnant
            const winner=that.gagnant($last.data('row'),$last.data('col'));



            //change de couleur de pion dés que l'un a joué
            that.player=(that.player==='rouge')? 'jaune' :'rouge';


            //Affiche un texte qui annonce le vainqueur 
            if (winner){
                
                console.log(`${winner}`);
                if (winner=== 'rouge'){
                    that.compteurrouge++;
                    window.alert(`les ${winner} ont gagné et ont ${that.compteurrouge} points et les jaunes ont ${that.compteurjaune} points`);
                    
                    
                }
                else{
                    that.compteurjaune++;
                    window.alert(`les ${winner} ont gagné et ont ${that.compteurjaune} points et les rouges ont ${that.compteurrouge} points`);
                    
                }
                $('#restart').css('visibility',"visible");
            }

            
        });
    }

    gagnant(row,col){
        const that = this;

        //récupère la cellule
        function $position(i,j){
            return $(`.col[data-row='${i}'][data-col='${j}']`)
        }
        
        //compte le nombre de pion qu'il y a d'aligné
        function nbPionAligne(direction){
            let total =0;
            let i = row + direction.i;
            let j = col+direction.j;
            let $next=$position(i,j);
            while(i>=0 && i < that.row && j>=0 && j< that.col && $next.data('player')===that.player){
                total++;
                i+= direction.i;
                j+= direction.j;
                $next = $position(i,j);
            }
            return total;
        }

        //vérifie si il y a un gagnant par rapport au nombre de pion d'aligné
        function gagnant(directionA, directionB){
            const total = 1+nbPionAligne(directionA)+nbPionAligne(directionB);
            if(total>=4){
                return that.player;
            }else{
                return null;
            }
        }
        
        // implémente le chemin à parcourir pour compter les pions alignés

        function horizontal(){
            return gagnant({i:0,j:-1},{i:0,j:1});
        }
        function vertical(){
            return gagnant({i:-1,j:0},{i:1,j:0});
        }
        function diagonalD(){
            return gagnant({i:1,j:1},{i:-1,j:-1});
        }
        function diagonalG(){
            return gagnant({i:1,j:-1},{i:-1,j:1});
        }
        return horizontal() || vertical() || diagonalD() || diagonalG();
    }
    
}