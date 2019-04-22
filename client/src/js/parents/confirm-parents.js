import React, { Component } from 'react'
import { connect } from 'react-redux'
import DonorProfile from './donor-profile'
import Form from '../inputs/form'
import { editParent } from '../../redux/actions';
import { getParents } from '../client'

class ConfirmParents extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: -1,
            parents: []
        }
    }

    componentDidMount() {
        getParents(this.props.orderId, parents => {
            this.setState({
                parents: parents
            }, () => { console.log('Parents mounted') }
            )
        })
    }

    //Select or deselect the parentat the given id
    expand(id) {
        this.setState(state => {
            const selected = state.expanded === id ? -1 : id;
            return ({
                expanded: selected
            });
        });
    }

    render() {
        const parentProfiles = this.state.parents.map((parent, index) => (
            <DonorProfile
                key={index}
                id={index}
                profile={parent}
                expanded={this.state.expanded === index}
                onClick={(id) => { this.expand(id) }}
            />
        ))
        return (
            <Form
                className='confirm-parents'
                onSubmit={() => {
                    if (this.state.expanded !== -1) {
                        this.props.editParent(2 - this.state.expanded)
                    }
                }}
            >
                <div className="parent-container">
                    {parentProfiles}
                </div>
            </Form>
        )
    }
}

export default connect(
    state => ({ orderId: state.userInfo.user }),
    { editParent }
)(ConfirmParents);