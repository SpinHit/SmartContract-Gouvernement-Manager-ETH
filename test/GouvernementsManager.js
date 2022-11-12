//artifact permet de récuperer le contrat et de l'utiliser
const GouvernementsManager = artifacts.require("./GouvernementsManager");

//Importe le contrat et les account eth
contract("./GouvernementsManager", accounts => {

  //Premier test ajout de Gouvernement (2eme param ft async)
  it('Devrais ajouter un Gouvernement', async () => {
    //Récupère le contrat 
    const Contract = await GouvernementsManager.deployed();
    //resultat de la fonction qui ajoute un Gouvernement (from account est le propriétaire du contrat)
    const result = await Contract.addGouvernement('0x6e023a727d7ba7edfc6e63cce8f71c37c7604512',
      'Français', { from: accounts[0] });
    assert.equal(result.logs[0].args._name, "Français", "Not equal to Français");
  })

  //N'ajoute pas de Gouvernement si exist
  it('Devrais ne pas ajouter de Gouvernement si il existe', async () => {
    const Contract = await GouvernementsManager.deployed();
    let err = null;
    //Essaie d'ajouer un autre Gouvernement sur une addresse existante pour un autre
    try {
      await Contract.addGouvernement('0x6e023a727d7ba7edfc6e63cce8f71c37c7604512',
        'Français', { from: accounts[0] });
    }
    catch (error) {
      err = error;
    }
    // Si err est une instance d'une erreur alors Try catch à généré une erreur
    assert.ok(err instanceof Error);
  })

  it('Devrais ajouter un Profile', async () => {
    const Contract = await GouvernementsManager.deployed();

    const result = await Contract.addProfile('0x6e023a727d7ba7edfc6e63cce8f71c37c7604512',
      'Benzemma', 'Karim', 182, 972484694, 'Paris', 'Française', 'Marron', { from: accounts[0] });
    // on ajoute un deuxieme profile pour le meme gouvernement
    /*     const result2 = await Contract.addProfile('0x6e023a727d7ba7edfc6e63cce8f71c37c7604512',
          'Griezmann', 'Antoine', 176, 972468694, 'Nice', 'Française', 'Noir', { from: accounts[0] });
        assert.equal(result.logs[0].args._nom, 'Benzemma', "Not equals to Benzemma"); */
  })

  it('Devrais ne pas ajouter un Profile a un gouvernement inconnu ', async () => {
    let err = null;
    try {
      //Passe une addresse ne correspodant pas à un gouvernement
      await Contract.addProfile('0x24abae56e491dc290e43282cc2076cc6faa1e41d', 'Macron', 'Emanuelle', 174, 972464694, 'Paris', 'Française', 'Marron', { from: accounts[0] });
    }
    catch (error) {
      err = error;
    }
    assert.ok(err instanceof Error);
  })

  it('Devrais avoir le profile dun Gouvernement', async () => {
    const Contract = await GouvernementsManager.deployed();
    // Le parametre account est ici facultatif car pas de modifier onlyOwner
    const result = await Contract.getGouvernementProfiles('0x6e023a727d7ba7edfc6e63cce8f71c37c7604512', { from: accounts[0] });
    assert.equal(result.logs[0].args._Profiles[0]._nom, 'Benzemma', "Not equals to Benzemma");
    /* console.log(result.logs[0].args._Profiles); */

  })
})
