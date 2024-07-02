import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
// Redux
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"

import axios from "axios"

const ProfileMenu = props => {
  const [menu, setMenu] = useState(false)

  useEffect(() => {
    adprofile()
  }, [])

  const [admininfo, setadmininfo] = useState([])

  var gets = localStorage.getItem("authUser")
  var data = JSON.parse(gets)
  var datas = data.token
  var datas1 = data.user

  const adprofile = () => {
    var token = datas
    const adinfo = datas1.id

    axios
      .post(
        "http://16.171.143.201:5025/v1/admin/adminemployees/getemployeebyid",
        { id: adinfo },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(res => {
        setadmininfo(res.data.profilesResult)
      })
  }

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item "
          id="page-header-user-dropdown"
          tag="button"
        >
          <img
            className="rounded-circle header-profile-user"
            // src={"http://16.171.143.201:5025/" + admininfo.profilePic}
            alt="Header Avatar"
          />
          <span className="d-none d-xl-inline-block ms-2 me-1">
            {/* {admininfo.firstName} {admininfo.lastName} */}
          </span>
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem tag="a" href="/profile">
            {" "}
            <i className="bx bx-user font-size-16 align-middle me-1" />
            {props.t("Profile")}{" "}
          </DropdownItem>

          <div className="dropdown-divider" />
          <Link to="/logout" className="dropdown-item">
            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
            <span>{props.t("Logout")}</span>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  )
}

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any,
}

const mapStatetoProps = state => {
  const { error, success } = state.Profile
  return { error, success }
}

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(ProfileMenu))
)
