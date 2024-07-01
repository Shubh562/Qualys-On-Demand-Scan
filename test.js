

const nodemailer = require("nodemailer");

async function sendEmail(to, subject, text) {
  try {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: '10.102.206.75',
      port: 25,
      secure: false, // true for 465, false for other ports
      tls:{
        rejectUnauthorized:false,
      },
      auth: {
        user: 'Meghna.chattaraj@vcontractor.co.za',
        pass: 'P@$$w0rd25@2023'
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Meghna.chattaraj@vcontractor.co.za', // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      text: text, // plain text body
    });

    console.log("Message sent: %s", info.messageId);
  } catch (err) {
    console.error(err);
  }
}
sendEmail('kumarshubham562@gmail.com','scan reference','heyyy your refrence');


 @Test
    public void compareDatesSameDayReturnsZero() throws Exception {
        SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy");
        Date date1 = sdf.parse("12/31/2024");
        Date date2 = sdf.parse("12/31/2024");
        assertEquals(0, DateUtil.compareDates(date1, date2, TimeZone.getDefault()));
    }

    // Test case to ensure coverage of "return -1"
    @Test
    public void compareDatesFirstBeforeSecondReturnsMinusOne() throws Exception {
        SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy");
        Date date1 = sdf.parse("12/30/2024");
        Date date2 = sdf.parse("12/31/2024");
        assertEquals(-1, DateUtil.compareDates(date1, date2, TimeZone.getDefault()));
    }

    // Test case to ensure coverage of "return firstCal.after(secondCal) ? 1 : 999;"
    @Test
    public void compareDatesFirstAfterSecondReturnsOne() throws Exception {
        SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy");
        Date date1 = sdf.parse("01/01/2025");
        Date date2 = sdf.parse("12/31/2024");
        assertEquals(1, DateUtil.compareDates(date1, date2, TimeZone.getDefault()));
    }

    // Ensure coverage for "return 999" when one or both dates are null
    @Test
    public void compareDatesWithNullDatesReturns999() {
        assertEquals(999, DateUtil.compareDates(null, null, TimeZone.getDefault()));
        assertEquals(999, DateUtil.compareDates(new Date(), null, TimeZone.getDefault()));
        assertEquals(999, DateUtil.compareDates(null, new Date(), TimeZone.getDefault()));
    }









// src/App.tsx
import React, { useState } from 'react';
import ReactFlow, { MiniMap, Controls, Elements, FlowElement } from 'react-flow-renderer';
import './App.css';

const initialElements: Elements = [
  { id: '1', data: { label: 'PR/CR' }, position: { x: 250, y: 0 } },
  { id: '2', data: { label: 'Class1.method1' }, position: { x: 100, y: 100 }, parentNode: '1' },
  { id: '3', data: { label: 'Class2.method1' }, position: { x: 400, y: 100 }, parentNode: '1' },
  { id: '4', data: { label: 'Class3.method1' }, position: { x: 100, y: 200 }, parentNode: '2' },
  { id: '5', data: { label: 'Class1.method2' }, position: { x: 400, y: 200 }, parentNode: '3' },
  { id: 'e1-2', source: '1', target: '2', type: 'smoothstep' },
  { id: 'e1-3', source: '1', target: '3', type: 'smoothstep' },
  { id: 'e2-4', source: '2', target: '4', type: 'smoothstep' },
  { id: 'e3-5', source: '3', target: '5', type: 'smoothstep' },
];

const App: React.FC = () => {
  const [elements, setElements] = useState<Elements>(initialElements);
  const [selectedNode, setSelectedNode] = useState<FlowElement | null>(null);

  const onElementClick = (_, element: FlowElement) => {
    if (element.id.startsWith('e')) return; // Ignore edges
    setSelectedNode(element);
  };

  const addNode = () => {
    if (!selectedNode) return;

    const newNodeId = (elements.length + 1).toString();
    const newNode: FlowElement = {
      id: newNodeId,
      data: { label: `New Node ${newNodeId}` },
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      parentNode: selectedNode.id,
    };

    const newEdge: FlowElement = {
      id: `e${selectedNode.id}-${newNodeId}`,
      source: selectedNode.id,
      target: newNodeId,
      type: 'smoothstep',
    };

    setElements((els) => els.concat(newNode, newEdge));
  };

  return (
    <div className="main-content">
      <div className="sidebar">
        <input type="text" placeholder="Choose your Repository" />
        <ul>
          <li>PR 1</li>
          <li>PR 2</li>
          <li>PR 3</li>
          <li>PR 4</li>
        </ul>
      </div>
      <div className="content">
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>Jira</th>
                <th>Test ID</th>
                <th>BDD Feature</th>
                <th>Code Changes</th>
              </tr>
            </thead>
            <tbody>
              {/* Add table rows dynamically here */}
            </tbody>
          </table>
        </div>
        <div className="diagram">
          <ReactFlow elements={elements} onElementClick={onElementClick}>
            <MiniMap />
            <Controls />
          </ReactFlow>
        </div>
        <div>
          <button onClick={addNode} disabled={!selectedNode}>
            Add Node
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;









.main-content {
  display: flex;
}

.sidebar {
  width: 200px;
  background-color: #f4f4f4;
  padding: 10px;
}

.sidebar input {
  width: 100%;
  padding: 5px;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar ul li {
  padding: 5px 0;
}

.content {
  flex: 1;
  padding: 20px;
}

.table {
  margin: 20px 0;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
}

.diagram {
  height: 400px;
  background-color: #e0e0e0;
}

