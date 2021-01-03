import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Table from "components/Table/Table.js";

import avatar from "assets/img/faces/marc.jpg";

import { useQuery, gql } from '@apollo/client'

const GET_DATA_QUERY = gql`
  {
    getPeople(first: 15, orderBy: name_asc) {
      name
      type
      address
      date_of_birth
    }
  }
`

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

export default function Person() {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_DATA_QUERY)
  if (error) return <p>Error</p>
  if (loading) return <p>Loading</p>
  const _tableData = data.getPeople.map((row) => (
    [
      row.name,
      row.type,
      row.date_of_birth,
      row.address
    ]
    )
    )

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>People</h4>
                <p className={classes.cardCategoryWhite}>
                  List of all people
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="primary"
                  tableHead={["Name", "Type", "Date of Birth", "Address"]}
                  tableData={_tableData}
                />
              </CardBody>
            </Card>
          </GridItem>
      </GridContainer>
    </div>
  );
}
