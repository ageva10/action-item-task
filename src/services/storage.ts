Storage.prototype.has = function(key) {
	return !!this.getItem(key)
}

Storage.prototype.set = function(key, value) {
	this.setItem(key, JSON.stringify(value))
}

Storage.prototype.get = function(key) {
	return JSON.parse(this.getItem(key))
}

Storage.prototype.update = function(key, value) {
	this.setItem(key, typeof value === 'object' ?
		JSON.stringify(Object.assign(JSON.parse(this.getItem(key)), value)):
		JSON.stringify(value))
}

Storage.prototype.remove = function(key) {
	this.removeItem(key)
}

Storage.prototype.destroy = function() {
	this.clear()
}
