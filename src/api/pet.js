class Pet {
	/**
	 * @param {string} id
	 * @param {string} ownerId
	 * @param {string} name
	 * @param {string} specy
	 * @param {string} type
	 * @param {number} age
	 * @param {string} info
	 * @param {string} photoUrl
	 * @param {string[]} vaccines
	 */
	constructor(id, ownerId, name, specy, type, age, info, photoUrl, vaccines) {
		this.id = id
		this.ownerId = ownerId
		this.name = name
		this.specy = specy
		this.type = type
		this.age = age
		this.info = info
		this.photoUrl = photoUrl
		this.vaccines = vaccines
	}
}

export default Pet
