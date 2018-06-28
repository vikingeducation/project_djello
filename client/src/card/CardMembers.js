import React from 'react'

const MemberForm = (props) => {

	return (
		<form className="form-inline">
  <div className="form-group mx-sm-3 mb-2">

    <select class="form-control form-control-sm">
  <option>Small select</option>
</select>
  </div>
  <button type="submit" size="sm" className="btn btn-primary mb-2">Confirm identity</button>
</form>
	)
}

export default MemberForm;