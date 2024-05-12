const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema({
  Id: Number,
  Name: String,
  Class: String,
  Race: String,
  Level: Number,
  XP: Number,
  HP: Number,
  MP: Number,
  /**
   * STR: Strength
   *     - A measure of physical power and endurance.
   *     - Higher STR provides better melee damage, more carrying capacity, and improved
   *     resistance to physical damage.
   *
   * DEX: Dexterity
   *     - A measure of agility and coordination.
   *     - Higher DEX provides better initiative, improved accuracy with ranged attacks,
   *     increased dodge (ability to avoid attacks), and improved balance.
   *
   * CON: Constitution
   *     - A measure of physical resilience and endurance.
   *     - Higher CON provides more hit points, improved ability to withstand physical
   *     stress and strain, and greater resistance to disease and poison.
   *
   * INT: Intelligence
   *     - A measure of mental acuity and problem-solving ability.
   *     - Higher INT provides better spellcasting ability, improved proficiency with
   *     certain skills, and improved ability to understand and analyze complex
   *     information.
   *
   * WIS: Wisdom
   *     - A measure of mental clarity and perception.
   *     - Higher WIS provides better will saves, improved insight and perception, and
   *     improved ability to understand and analyze complex information.
   *
   * CHA: Charisma
   *     - A measure of personal magnetism and persuasion ability.
   *     - Higher CHA provides better persuasion and intimidation scores, improved
   *     ability to lead and command, and improved ability to communicate effectively.
   */
  STR: Number,
  DEX: Number,
  CON: Number,
  INT: Number,
  WIS: Number,
  CHA: Number,
});

const Character = mongoose.model("Character", characterSchema);

module.exports = Character;
