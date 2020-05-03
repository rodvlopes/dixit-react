# Disclaimer

The images in this folder were public available in http://www.boiteajeux.net/ 

### To Download Use 

    for i in $(seq 1 84); do curl http://www.boiteajeux.net/jeux/dix/img/$i.png > "card_$(($i-1)).png"; done
