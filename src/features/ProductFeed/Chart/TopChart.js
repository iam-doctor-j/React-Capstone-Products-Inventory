import React from 'react';
import Card from 'react-bootstrap/Card';
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import * as _ from 'lodash';
import { refresh } from '../../Authentication/AuthenticationSlice';
import { fetchProductsFromDb } from '../ProductFeedSlice';
import Form from 'react-bootstrap/Form'

export class TopChart extends React.Component {

    constructor() {
        super();
        this.state = {
            chartData: {},
        };
        this.number = 3;
    }

    componentDidMount() {
        if(this.props.products.length === 0){
            this.props.dispatch(fetchProductsFromDb());
        }
        this.chart(this.number);
    }

    componentDidUpdate(prevProps, prevState) {
        if(JSON.stringify(this.props.products) !== JSON.stringify(prevProps.products)) {
            this.chart(this.number)
        }
    }

    chart = (number) => {
        console.log(number)
        let productName = [];
        let views = [];

        let sortedList = _.orderBy(this.props.products, ['views'], ['desc']);

        let topList = sortedList.slice(0, number);
        
        topList.forEach(item => {
            productName.push(item.name.value);
            views.push(item.views);
        });

        console.log(productName);
        console.log(views);

        this.setState({
            chartData: {
                labels: productName,
                datasets: [{
                    label: "Views",
                    data: views,
                    backgroundColor: ["rgba(75, 192, 192, 0.6)"],
                    borderWidth: 4,
                    minBarLength: 10,
                }]
            }
        });
    }

    render() {
        return(
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12">
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                <div className="d-flex">
                                    <span className="heading-text">Top Chart</span>
                                    <a className="ml-auto" onClick={() => {this.props.dispatch(refresh()); this.props.history.goBack()}} style={{cursor: 'pointer', color: 'var(--secondary)'}}><i className="fas fa-arrow-circle-left"></i></a>
                                </div>
                                </Card.Title>
                                {this.props.products.length >= 3 ? <div className="row mx-4 mt-4">
                                    <div className="col-md-4 col-12 label-text">Select number of top products</div>
                                    <div className="col-md-8 col-12">
                                        <Form.Control as="select" custom defaultValue={3} onChange={(e) => this.chart(+e.target.value)}>
                                            {/* <option value={1}>1</option>
                                            <option value={2}>2</option> */}
                                            <option value={3}>3</option>
                                            {this.props.products.length >= 4 ? <option value={4}>4</option> : <></>}
                                            {this.props.products.length >= 5 ? <option value={5}>5</option> : <></>}
                                            {this.props.products.length >= 6 ? <option value={6}>6</option> : <></>}
                                            {this.props.products.length >= 7 ? <option value={7}>7</option> : <></>}
                                            {this.props.products.length >= 8 ? <option value={8}>8</option> : <></>}
                                            {this.props.products.length >= 9 ? <option value={9}>9</option> : <></>}
                                            {this.props.products.length >= 10 ? <option value={10}>10</option> : <></>}
                                        </Form.Control>
                                    </div>
                                </div> : <></>}
                                <Bar 
                                    data={this.state.chartData}
                                    options={{
                                        scales:  {
                                            yAxes: [{
                                                ticks: {
                                                    beginAtZero: true
                                                }
                                            }]
                                        }
                                    }}
                                    />
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(state => {
    console.log(state);
    return {
        products: state.productFeed.products
    }
})(TopChart);