let csvFile;
let listVille = [];
let nbPermutation = 0;
let nbComparaison = 0;

document.querySelector("#read-button").addEventListener('click', function () {
    csvFile = document.querySelector("#file-input").files[0];
    let reader = new FileReader();
    reader.addEventListener('load', function (e) {
        // récupération de la liste des villes
        listVille = getArrayCsv(e.target.result);

        // Calcul de la distance des villes par rapport à Grenoble
        listVille.forEach(ville => {
            ville.distanceFromGrenoble = distanceFromGrenoble(ville);
        });
        // Tri
        const algo = $("#algo-select").val();
        nbPermutation = 0;
        nbComparaison = 0;
        sort(algo);

        // Affichage 
        displayListVille()
    });
    reader.readAsText(csvFile)
})

/**
 * Récupére la liste des villes contenu dans le fichier csv
 * @param csv fichier csv brut
 * @returns la liste des villes mis en forme
 */
function getArrayCsv(csv) {
    let listLine = csv.split("\n")
    listVille = [];
    let isFirstLine = true;
    listLine.forEach(line => {
        if (isFirstLine || line === '') {
            isFirstLine = false;
        } else {
            let listColumn = line.split(";");
            listVille.push(
                new Ville(
                    listColumn[8],
                    listColumn[9],
                    listColumn[11],
                    listColumn[12],
                    listColumn[13],
                    0
                )
            );
        }
    });
    return listVille;
}

/**
 * Calcul de la distance entre Grenoble et une ville donnée
 * @param ville ville
 * @returns la distance qui sépare la ville de Grenoble
 */
function distanceFromGrenoble(ville) {

    const grenobleLatitude = 45.166667;
    const grenobleLongitude = 5.716667;

    const R = 6371e3; // metres
    const φ1 = ville.latitude * Math.PI/180; // φ, λ in radians
    const φ2 = grenobleLatitude * Math.PI/180;
    const Δφ = (grenobleLatitude-ville.latitude) * Math.PI/180;
    const Δλ = (grenobleLongitude-ville.longitude) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const distance = R * c; // in metres

    return distance;

}

/**
 * Retourne vrai si la ville i est plus proche de Grenoble
 * par rapport à j
 * @param {*} i distance de la ville i
 * @param {*} j distance de la ville j
 * @return vrai si la ville i est plus proche
 */
function isLess(i, j) {
    return listVille[i].distanceFromGrenoble < listVille[j].distanceFromGrenoble;
}

/**
 * interverti la ville i avec la ville j dans la liste des villes
 * @param {*} i 
 * @param {*} j 
 */
function swap(i, j) {
    let temp = listVille[i];
    listVille[i] = listVille[j];
    listVille[j] = temp;
    nbPermutation++;
}

function sort(type) {
    switch (type) {
        case 'insert':
            insertsort();
            break;
        case 'select':
            selectionsort();
            break;
        case 'bubble':
            bubblesort();
            break;
        case 'shell':
            shellsort();
            break;
        case 'merge':
            mergesort();
            break;
        case 'heap':
            heapsort();
            break;
        case 'quick':
            quicksort(0, listVille.length - 1);
            break;
    }
}

function insertsort() {
    let i = 1;
    while (i < listVille.length) {
        let distance = listVille[i].distanceFromGrenoble;
        let j = i  ;
        while (j > 0 && listVille[j - 1].distanceFromGrenoble > distance) {
            swap(j, j-1)
            j--
        }
        i++;
    }
    return listVille;
}


function selectionsort() {
    let n = listVille.length;

    for(let lowestDistance = 0; lowestDistance < n; lowestDistance++) {
        // Finding the lowest distance in the subarray
        let min = lowestDistance;
        for(let nextCity = lowestDistance+1; nextCity < n; nextCity++){
            if(listVille[nextCity].distanceFromGrenoble < listVille[min].distanceFromGrenoble) {
                min=nextCity;
            }
        }
        if (min !== lowestDistance) {
            swap(min, lowestDistance)
        }
    }
    return listVille;
}

// function bubblesort() {
//     let n = listVille.length;
//
//     for(let i = 0; i < n; i++) {
//         for(let ville = 0; ville < n-1; ville++) {
//             // Comparing and swapping the cities by distance
//             if(listVille[ville].distanceFromGrenoble > listVille[ville+1].distanceFromGrenoble){
//                 swap(ville,ville+1)
//             }
//         }
//     }
//     return listVille;
// }

function bubblesort() {
    let swapped = true;
    while(swapped){
        swapped = false;
        for(let i=0; i < listVille.length -1; i++){
            if (listVille[i].distanceFromGrenoble > listVille[i+1].distanceFromGrenoble){
                swapped = true;
                swap( i, i + 1)
            }
        }
    }
    return listVille;
}

function shellsort() {
    console.log("shellsort - implement me !");
}

function mergesort() {
    console.log("mergesort - implement me !");
}


function heapsort() {
    console.log("heapsort - implement me !");
}

function quicksort(indexStart, indexEnd) {
    if (indexEnd - indexStart > 0) {
        // Returns pivotIndex
        let partIndex = part(indexStart, indexEnd)
        // Recursively apply the same logic to the left and right subarrays
        quicksort( indexStart, partIndex - 1)
        quicksort( partIndex + 1, indexEnd)
    }
}

function part(indexStart, indexEnd) {
    // Taking the last element as the pivot
    const pivot = indexEnd
    let j = indexStart
    for (let i = indexStart; i <= pivot; i++) {
        if (listVille[i].distanceFromGrenoble < listVille[pivot].distanceFromGrenoble) {
            // Swapping elements
            swap(i, j)
            // Moving to next element
            j++
        }
    }
    swap(indexEnd, j)
    return j;
}

/** MODEL */

class Ville {
    constructor(nom_commune, codes_postaux, latitude, longitude, dist, distanceFromGrenoble) {
        this.nom_commune = nom_commune;
        this.codes_postaux = codes_postaux;
        this.latitude = latitude;
        this.longitude = longitude;
        this.dist = dist;
        this.distanceFromGrenoble = distanceFromGrenoble;
    }
}

/** AFFICHAGE */
function displayPermutation(nbPermutation) {
    document.getElementById('permutation').innerHTML = nbPermutation + ' permutations';
}

function displayListVille() {
    document.getElementById("navp").innerHTML = "";
    displayPermutation(nbPermutation);
    let mainList = document.getElementById("navp");
    for (var i = 0; i < listVille.length; i++) {
        let item = listVille[i];
        let elem = document.createElement("li");
        elem.innerHTML = item.nom_commune + " - \t" + Math.round(item.distanceFromGrenoble * 100) / 100 + ' m';
        mainList.appendChild(elem);
    }
}
