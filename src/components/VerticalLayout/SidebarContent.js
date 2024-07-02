import PropTypes from "prop-types"
import React, { useEffect, useRef } from "react"

// //Import Scrollbar
import SimpleBar from "simplebar-react"

// MetisMenu
import MetisMenu from "metismenujs"
import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"

const SidebarContent = props => {
  const ref = useRef()
  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  useEffect(() => {
    const pathName = props.location.pathname

    const initMenu = () => {
      new MetisMenu("#side-menu")
      let matchingMenuItem = null
      const ul = document.getElementById("side-menu")
      const items = ul.getElementsByTagName("a")
      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i]
          break
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem)
      }
    }
    initMenu()
  }, [props.location.pathname])

  useEffect(() => {
    ref.current.recalculate()
  })

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300
      }
    }
  }

  function activateParentDropdown(item) {
    item.classList.add("active")
    const parent = item.parentElement
    const parent2El = parent.childNodes[1]
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show")
    }

    if (parent) {
      parent.classList.add("mm-active")
      const parent2 = parent.parentElement

      if (parent2) {
        parent2.classList.add("mm-show") // ul tag

        const parent3 = parent2.parentElement // li tag

        if (parent3) {
          parent3.classList.add("mm-active") // li
          parent3.childNodes[0].classList.add("mm-active") //a
          const parent4 = parent3.parentElement // ul
          if (parent4) {
            parent4.classList.add("mm-show") // ul
            const parent5 = parent4.parentElement
            if (parent5) {
              parent5.classList.add("mm-show") // li
              parent5.childNodes[0].classList.add("mm-active") // a tag
            }
          }
        }
      }
      scrollElement(item)
      return false
    }
    scrollElement(item)
    return false
  }

  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{props.t("Menu")} </li>

            {/* // Dashboard */}

            <li>
              <Link to="/dashboard">
                <i className="bx bxs-dashboard"></i>
                <span>{props.t("Dashboards")}</span>
              </Link>
            </li>

            {/* //Service */}

            <li>
              <Link to="/#" className="has-arrow">
                <i className="bx bx-server"></i>
                <span>{props.t("Services")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/Addsystemmodule">
                    {props.t("Add Services")}
                  </Link>
                </li>

                <li>
                  <Link to="/Modules">{props.t("Services")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow">
                <i className="bx bx-cart"></i>
                <span>{props.t("Category/Products")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/Categories">{props.t("Categories ")}</Link>
                </li>
                <li>
                  <Link to="/SubCategory">{props.t("Sub Category")}</Link>
                </li>
                <li>
                  <Link to="/SubSubCategory">
                    {props.t("Sub Sub Category ")}
                  </Link>
                </li>
                <li>
                  <Link to="/Specifications">{props.t("Specifications")}</Link>
                </li>
                <li>
                  <Link to="/SpecificationsValues">{props.t("SpecificationsValues")}</Link>
                </li>
                <li>
                  <Link to="/Products">{props.t("Products")}</Link>
                </li>
                {/* <li>
                  <Link to="/BulkUpload">{props.t("Bulk Upload")}</Link>
                </li> */}
                <li>
                  <Link to="/Dealproduct">{props.t("Deal Products")}</Link>
                </li>
                {/* <li>
                  <Link to="/HomeCategory">{props.t("Home Category")}</Link>
                </li> */}
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow">
                <i className="bx bx-street-view"></i>
                <span>{props.t("Store Manager")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/Store">{props.t("Store")}</Link>
                </li>
                <li>
                  <Link to="/StoreEarnings">
                    {props.t("Store Earning/Payments")}
                  </Link>
                </li>
                <li>
                  <Link to="/Watingforapproval">
                    {props.t("Wating For Appoval")}
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow">
                <i className="bx bx-store"></i>
                <span>{props.t("Orders")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/Rejuctedbystore">
                    {props.t("Rejected By Store")}
                  </Link>
                </li>
                <li>
                  <Link to="/Compleatedorders">
                    {props.t("Compleated Orders")}
                  </Link>
                </li>
                <li>
                  <Link to="/Pendingorders">{props.t("Pendings Orders")}</Link>
                </li>
                <li>
                  <Link to="/Cancelledorders">
                    {props.t("Cancelled orders")}
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow">
                <i className="bx bx-money"></i>
                <span>{props.t("Wallet")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/Payoutrequests">{props.t("Payout Requests")}</Link>
                </li>
                <li>
                  <Link to="/Payoutvalue">
                    {props.t("Payout Value Validation")}
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/Users">
                <i className="bx bx-id-card"></i>
                <span>{props.t("Users")}</span>
              </Link>
            </li>

            <li>
              <Link to="/Deliveryboy">
                <i className="bx bx-user-check"></i>
                <span>{props.t("Delivery  Boy")}</span>
              </Link>
            </li>

            <li>
              <Link to="/Coupons">
                <i className="bx bxs-purchase-tag-alt"></i>
                <span>{props.t("Coupons")}</span>
              </Link>
            </li>

            <li>
              <Link to="/Notifications">
                <i className="bx bx-bell"></i>
                <span>{props.t("Send Notification")}</span>
              </Link>
            </li>

            <li>
              <Link to="/#" className="has-arrow">
                <i className="bx bx-carousel"></i>
                <span>{props.t("Banner")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/MainBanners">{props.t("Main Banner")}</Link>
                </li>
                <li>
                  <Link to="/Secondarybanner">
                    {props.t("Secondary Banner")}
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow">
                <i className="bx bx-wallet-alt"></i>
                <span>{props.t("Rewards")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/RewardValue">{props.t("Reedem Value")}</Link>
                </li>
                <li>
                  <Link to="/Redeemvalue">{props.t("Reward Value")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow">
                <i className="bx bx-navigation"></i>
                <span>{props.t("Locations")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/States">{props.t("States")}</Link>
                </li>
                <li>
                  <Link to="/Cities">{props.t("Cities")}</Link>
                </li>
                <li>
                  <Link to="/Areas">{props.t("Areas")}</Link>
                </li>
                <li>
                  <Link to="/Pincode">{props.t("Pincodes")}</Link>
                </li>
                {/* <li>
                  <Link to="/Districts">{props.t("Districts")}</Link>
                </li> */}
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow">
                <i className="bx bx-book-open"></i>
                <span>{props.t("Pages")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/Aboutus">{props.t("Aboutus")}</Link>
                </li>
                <li>
                  <Link to="/Tearms">{props.t("Terms & Conditions")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow">
                <i className="bx bx-slider-alt "></i>
                <span>{props.t("Settings")}</span>
              </Link>
              <ul className="sub-menu">
              <li>
                  <Link to="/Language">{props.t("Language")}</Link>
                </li>
                <li>
                  <Link to="/Gobalsettings">{props.t("Goblal Settings")}</Link>
                </li>

                <li>
                  <Link to="/Appsettings">{props.t("App Settings")}</Link>
                </li>

                <li>
                  <Link to="/Smsotp">{props.t("SMS/OTP Api")}</Link>
                </li>

                <li>
                  <Link to="/Mapapi">{props.t("Map Api")}</Link>
                </li>
                <li>
                  <Link to="/AppNoties">{props.t("Api Notice")}</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  )
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
}

export default withRouter(withTranslation()(SidebarContent))
