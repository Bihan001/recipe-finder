import React from 'react';
import { Card, Button } from 'react-bootstrap';

const Card_big = () => {
  return (
    <div>
      <br />
      <br />
      <center>
        <Card
          style={{
            width: '23rem',
            boxShadow: '2px 2px 2rem rgb(0,0,0,0.2)',
            borderRadius: '5px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              backgroundColor: '#E74C3C',
              height: '40px',
            }}
          >
            <p
              style={{
                textAlign: 'left',
                paddingTop: 4,
                color: '#ffffff',
                paddingLeft: 20,
                fontSize: '1.2rem',
              }}
            >
              Gerina Army
            </p>
          </div>
          <Card.Img
            variant='top'
            src='https://excalibur79.github.io/Recipe/food4.jpg'
            style={{ height: '170px' }}
          />
          <Card.Body>
            <center>
              <Card.Title style={{ fontSize: '1.4rem' }}>
                Chick-pea Recipies to make your heart happy.
              </Card.Title>
              <Card.Text style={{ color: 'grey' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Card.Text>
              <div className='d-flex justify-content-around'>
                <Button
                  variant='light'
                  style={{
                    border: 'round',
                    borderRadius: '20px',
                    borderColor: '#e0e0e0',
                    borderWidth: '1px',
                    padding: '5px 15px',
                    margin: '5px',
                  }}
                >
                  Milk
                </Button>

                <Button
                  variant='light'
                  style={{
                    border: 'round',
                    borderRadius: '20px',
                    borderColor: '#e0e0e0',
                    borderWidth: '1px',
                    padding: '5px 15px',
                    margin: '5px',
                  }}
                >
                  Lemon
                </Button>
                <Button
                  variant='light'
                  style={{
                    border: 'round',
                    borderRadius: '20px',
                    borderColor: '#e0e0e0',
                    borderWidth: '1px',
                    padding: '5px 15px',
                    margin: '5px',
                  }}
                >
                  Sayur
                </Button>
              </div>
            </center>
          </Card.Body>
        </Card>
      </center>
    </div>
  );
};

export default Card_big;
