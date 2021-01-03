import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
import LinkIcon from '@material-ui/icons/Link';
import Person from "@material-ui/icons/Person";
import BusinessIcon from '@material-ui/icons/Business';

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import { bugs, website, server } from "variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

import { useQuery, gql } from '@apollo/client'

const GET_DATA_QUERY = gql`
  {
    getPeopleCount
    getOrganisationsCount
    getRelationshipCount
    getTotalRelationshipValue
    getTopEmployed {
      name
      employment
      party {
        name
        }
    }
    getTopProperty {
      name
      properties
      party {
        name
      }
    }
    getTopDonatedTo {
      name
      donations
      party {
        name
      }
    }
    getTopDonors {
      name
      type
      donations
    }
    getTopEmployers {
      name
      type
      employment
    }
    getTopShareholders {
      name
      shareholders
      opencorporates_registration
    }
  }
`

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_DATA_QUERY)
  if (error) return <p>Error</p>
  if (loading) return <p>Loading</p>
  console.log(data)
  const EmployedData = data.getTopEmployed.map((person) => (
    [
      person.name,
      person.party.name,
      person.employment,
    ]
    )
    )
  const PropertyData = data.getTopProperty.map((person) => (
    [
      person.name,
      person.properties,
      person.party.name,
    ]
    )
    )
  const DonationsData = data.getTopDonatedTo.map((person) => (
    [
      person.name,
      person.party.name,
      person.donations,
    ]
    )
    )
  const EmployersData = data.getTopEmployers.map((entity) => (
    [
      entity.name,
      entity.type,
      entity.employment,
    ]
    )
    )
  const DonorsData = data.getTopDonors.map((entity) => (
    [
      entity.name,
      entity.type,
      entity.donations,
    ]
    )
    )
  const ShareholdersData = data.getTopShareholders.map((entity) => (
    [
      entity.name,
      entity.shareholders,
      entity.opencorporates_registration,
    ]
    )
    )
  return (
    <div>
      <GridContainer>
      <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Person></Person>
              </CardIcon>
              <p className={classes.cardCategory}>People Count</p>
              <h3 className={classes.cardTitle}>
                {loading ? 'Loading...' : data.getPeopleCount}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  View people
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <BusinessIcon></BusinessIcon>
              </CardIcon>
              <p className={classes.cardCategory}>Organisations Count</p>
              <h3 className={classes.cardTitle}>
                {loading ? 'Loading...' : data.getOrganisationsCount}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  View organisations
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <LinkIcon></LinkIcon>
              </CardIcon>
              <p className={classes.cardCategory}>Relationship Count</p>
              <h3 className={classes.cardTitle}>
                {loading ? 'Loading...' : data.getRelationshipCount}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  View relationships
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <p className={classes.cardCategory}>Total Relationship Value</p>
              <h3 className={classes.cardTitle}>
                {loading ? 'Loading...' : "£" + data.getTotalRelationshipValue.toLocaleString()}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <a>
                  {loading ? 'Loading...' : "Avg. relationship: £" + parseInt((data.getTotalRelationshipValue / data.getRelationshipCount)).toLocaleString()}
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="success">
              <h4 className={classes.cardTitleWhite}>Top Employees</h4>
              <p className={classes.cardCategoryWhite}>
                Politicians earning the most
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="success"
                tableHead={["Name", "Party", "Amount"]}
                tableData={EmployedData}
              />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Top Employers</h4>
              <p className={classes.cardCategoryWhite}>
                Top employers of politicians
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["Name", "Employer Type", "Amount"]}
                tableData={EmployersData}
              />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="success">
              <h4 className={classes.cardTitleWhite}>Most Donations</h4>
              <p className={classes.cardCategoryWhite}>
                Politicians receiving the most donations
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="success"
                tableHead={["Name", "Party", "Amount"]}
                tableData={DonationsData}
              />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Top Donors</h4>
              <p className={classes.cardCategoryWhite}>
                Top donors to politicians
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["Name", "Donor Type", "Amount"]}
                tableData={DonorsData}
              />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="success">
              <h4 className={classes.cardTitleWhite}>Top Property Owners</h4>
              <p className={classes.cardCategoryWhite}>
                Polticians owning the most properties
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="success"
                tableHead={["Name", "Num of Properties", "Party"]}
                tableData={PropertyData}
              />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Top Shareholdings</h4>
              <p className={classes.cardCategoryWhite}>
                Top shareholdings of politicians
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["Name", "Num of Shareholders", "Company Registration"]}
                tableData={ShareholdersData}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
