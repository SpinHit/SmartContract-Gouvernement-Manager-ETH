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
    /* const _profileAddress = web3.utils.randomHex(20); */
    // on créer une adress manuellement pour tester
    const _profileAddress2 = '0x6e023a727d7ba7edfc6e63cce8f71c37c760451b';
    // on va utiliser le profileAddress2 pour le test
    const result = await Contract.addProfile('0x6e023a727d7ba7edfc6e63cce8f71c37c7604512',
      'Benzemma', 'Karim', 182, 972484694, 'Paris', 'Française', 'Marron', _profileAddress2, { from: accounts[0] });
  })

  // on rajoute un deuxieme profile pour le meme gouvernement
  it('Devrais ajouter un deuxieme Profile', async () => {
    const Contract = await GouvernementsManager.deployed();
    const _profileAddress = '0x6e023a727d7ba7edfc6e63cce8f71c37c760451c';
    const result2 = await Contract.addProfile('0x6e023a727d7ba7edfc6e63cce8f71c37c7604512',
      'Griezmann', 'Antoine', 176, 972468694, 'Nice', 'Française', 'Noir', _profileAddress, { from: accounts[0] });
  })



  it('Devrais ne pas ajouter un Profile a un gouvernement inconnu ', async () => {
    let err = null;
    try {
      //Passe une addresse ne correspodant pas à un gouvernement
      // on va génére une addresse random pour le profile 
      const randomAddress2 = web3.utils.randomHex(20);
      await Contract.addProfile('0x24abae56e491dc290e43282cc2076cc6faa1e41d', 'Macron', 'Emanuelle', 174, 972464694, 'Paris', 'Française', 'Marron', randomAddress2, { from: accounts[0] });
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

  // on retourne un profile en donnant l'adresse du profile '0x6e023a727d7ba7edfc6e63cce8f71c37c760451b' et l'adresse du gouvernement '0x6e023a727d7ba7edfc6e63cce8f71c37c7604512' cela devrais retourner le profile de Benzemma
  it('Devrais retourner le profile de Benzemma en donnant son addresse', async () => {
    const Contract = await GouvernementsManager.deployed();
    const result = await Contract.getProfileData('0x6e023a727d7ba7edfc6e63cce8f71c37c7604512', '0x6e023a727d7ba7edfc6e63cce8f71c37c760451c');
    // on retourne le résultat du profile de Benzemma
    console.log(result);
  })

})