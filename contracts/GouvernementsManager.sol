// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract GouvernementsManager {
    //Events
    event createGouvernement(string _name);
    event addedProfile(string _name, string _nom);
    event getTheProfiles(Profile[] _Profiles);

    // Représente une compilation
    struct Profile {
        string _nom; //Nom du profile
        string _prenom; // Prénom du profile
        uint256 _taille; //Taille en cm du profile
        uint256 _dateNaissance; //Date de naissance du profile
        string _lieuNaissance; //Lieu de naissance du profile
        string _nationalite; //Nationalité du profile
        string _couleurYeux; //Couleur des yeux du profile
    }

    //Représente un Gouvernement
    struct Gouvernement {
        string _name; //Nom du Gouvernement
        Profile[] _Profiles; //Tableau représente les profiles du Gouvernement
    }

    mapping(address => Gouvernement) Gouvernements; //Link l'adresse à un Gouvernement
    address owner; //addresse du propriétaire

    constructor() {
        owner = msg.sender; //Lors du deploiement stock l'addresse de la personne qui deploie le contrat
    }

    //Modifier controle si la personne est bien celle qui a déployer le contrat
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owned");
        _;
    }

    //Ajoute un Gouvernement
    function addGouvernement(address _GouvernementAdress, string memory _name)
        external
        onlyOwner
    {
        //Check si le Gouvernement existe si non le créer en lui attribuant un nom
        require(
            bytes(Gouvernements[_GouvernementAdress]._name).length == 0,
            "This Gouvernement has already been created"
        );
        Gouvernements[_GouvernementAdress]._name = _name;
        //Déclencher l'evenement permet de récuperer la data sur la partie Front end entre autre
        emit createGouvernement(_name);
    }

    //Ajoute un profile à un Gouvernement
    function addProfile(
        address _GouvernementAdress,
        string memory _nom,
        string memory _prenom,
        uint256 _taille,
        uint256 _dateNaissance,
        string memory _lieuNaissance,
        string memory _nationalite,
        string memory _couleurYeux
    ) external onlyOwner {
        //Check si le Gouvernement existe si oui créer une variable de type Structure Profile et lui affecte pour valeur
        //Le nom du profile et les autres données passées en paramètre
        require(
            bytes(Gouvernements[_GouvernementAdress]._name).length > 0,
            "This Gouvernement does'nt exists"
        );
        Profile memory thisProfile = Profile(
            _nom,
            _prenom,
            _taille,
            _dateNaissance,
            _lieuNaissance,
            _nationalite,
            _couleurYeux
        );
        //Envoi dans le tableau Profiles du Gouvernement la structure thisProfile
        Gouvernements[_GouvernementAdress]._Profiles.push(thisProfile);
        //Récupère le nom du Gouvernement et le nom du profile pour la partie Front end
        emit addedProfile(Gouvernements[_GouvernementAdress]._name, _nom);
    }

    //Récupère les Profiles d'un Gouvernement
    function getGouvernementProfiles(address _GouvernementAdress) external {
        require(
            bytes(Gouvernements[_GouvernementAdress]._name).length > 0,
            "This Gouvernement does'nt exists"
        );
        // Récupère le tableau représentatn la compilation pour le front end
        emit getTheProfiles(Gouvernements[_GouvernementAdress]._Profiles);
    }
}
