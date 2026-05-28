require('dotenv').config();
const {sequelize} = require('./models');

async function fixPassports() {
  const animals = await sequelize.query('SELECT animal_id FROM animals', {type: sequelize.QueryTypes.SELECT});
  
  for (let i = 0; i < animals.length; i++) {
    const aid = animals[i].animal_id;
    const gender = (i % 2 === 0) ? 'самец' : 'самка';
    const month = (i % 12) + 1;
    const birthDate = `2023-${month.toString().padStart(2,'0')}-15`;
    const chipNum = `RU${aid.toString().padStart(12,'0')}`;
    const passNum = `ZP2024${aid.toString().padStart(6,'0')}`;
    
    await sequelize.query(
      `UPDATE zoo_passports SET 
        passport_number = :num, 
        microchip_number = :chip, 
        birth_date = :birth, 
        gender = :gender,
        vaccines = '["Вакцинация от бешенства", "Комплексная вакцинация"]',
        parasites_treatments = '["Обработка от блох", "Обработка от глистов"]',
        vet_clinic = 'Ветеринарная клиника Призма',
        vet_phone = '+7 (495) 123-45-67'
      WHERE animal_id = :id`,
      {replacements: {num: passNum, chip: chipNum, birth: birthDate, gender: gender, id: aid}}
    );
  }
  
  const zp = await sequelize.query('SELECT passport_number, microchip_number, birth_date, gender, vaccines FROM zoo_passports LIMIT 2', {type: sequelize.QueryTypes.SELECT});
  console.log('✅ Зоопаспорта обновлены');
  console.log(JSON.stringify(zp, null, 2));
  
  await sequelize.close();
}

fixPassports();