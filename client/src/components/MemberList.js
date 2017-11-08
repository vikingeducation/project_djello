import React from 'react'
import { Row, Col } from 'reactstrap'

const MemberList = ({ member, onRemove }) => {

  const onClick = (e) => {
    e.preventDefault()
    onRemove(member.id)
  }

  return (
    <Row>
    <Col xs={12} sm={8}>
       {member.name}
    </Col>
    <Col xs={12} sm={4}>
       <a href="#" onClick={onClick}>Remove Member</a>
    </Col>
  </Row>)
}

export default MemberList