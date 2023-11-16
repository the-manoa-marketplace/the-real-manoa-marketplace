import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const ItemsForSale = () => {

  return (
    <Container className="d-flex align-items-center justify-content-start">

      <Row>
        <Col style={{ width: '15rem' }}>
          <Card className="d-flex align-items-center justify-content-start">
            <Card.Title>
              Za Pack
            </Card.Title>
            <Card.Text>Broccoli for sale - $50</Card.Text>
            <Card.Img variant="top" src="http://www.organicbiomama.com/wp-content/uploads/2016/04/2016-03-28-17.36.52.jpg" style={{width:'85%', height:'150px'}}/>
          </Card>
        </Col>
        <Col style={{ width: '15rem' }}>
          <Card className="d-flex align-items-center justify-content-start">
            <Card.Title>
              Blicky
            </Card.Title>
            <Card.Text>Selling blicky for $100</Card.Text>
            <Card.Img variant="top" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F1c%2F8f%2Fd1%2F1c8fd1628f3672ec210867fbd1a3da56.jpg&f=1&nofb=1&ipt=0be29a2babfa577477e7469829b847a2b850c861e548e975f5f04c6d9bee836f&ipo=images" style={{width:'85%', height:'150px'}}/>
          </Card>
        </Col>
        <Col style={{ width: '15rem' }}>
          <Card className="d-flex align-items-center justify-content-start">
            <Card.Title>
              Crazy Dust
            </Card.Title>
            <Card.Text>Asking for a cool $250</Card.Text>
            <Card.Img variant="top" src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.sweetcitycandy.com%2Fmedia%2Fcatalog%2Fproduct%2Fcache%2F1%2Fimage%2F9df78eab33525d08d6e5fb8d27136e95%2F0%2F0%2F0028.jpg&f=1&nofb=1&ipt=57ef32e9ea921997e81afcfb08e6e57b359cb7d6112b2d50862a4b24196333bb&ipo=images" style={{width:'85%', height:'150px'}}/>
          </Card>
        </Col>
        <Col style={{ width: '15rem' }}>
          <Card className="d-flex align-items-center justify-content-start">
            <Card.Title>
              Dr. Perky
            </Card.Title>
            <Card.Text>Selling the Dr. Perky for $5 - Negotiable perchance</Card.Text>
            <Card.Img variant="top" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fassets.edgenet.com%2Fdf9344bb-6be3-43ac-8abd-1e8217a3d77c%3FfileType%3Djpg%26size%3D600x600&f=1&nofb=1&ipt=4f6f609e59db012525c62f2e250220f2170a941d68a4183f8e53efec2beee2ff&ipo=images" style={{width:'85%', height:'150px'}}/>
          </Card>
        </Col>
        <Col style={{ width: '15rem' }}>
          <Card className="d-flex align-items-center justify-content-start">
            <Card.Title>
              One Yota
            </Card.Title>
            <Card.Text>Selling da truck for $100,000 - No low ballers. I know what i get</Card.Text>
            <Card.Img variant="top" src="https://www.car-accidents.com/2007-crash-pics/1-7-07-toyota-tacoma-crash.gif" style={{width:'85%', height:'150px'}}/>
          </Card>
        </Col>
      </Row>
    </Container>
  );

};

export default ItemsForSale;