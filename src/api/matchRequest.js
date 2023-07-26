export class Pet {
	constructor(petId, ownerId) {
		this.petId = petId
		this.ownerId = ownerId
	}
}

export class MatchRequest {
	/**
	 *
	 * @param {Pet} from
	 * @param {Pet} to
	 * @param {*} status
	 * @param {*} id
	 */
	constructor(from, to, status, id) {
		this.from = from
		this.to = to
		this.status = status
		this.id = id
	}
}

export default MatchRequest
