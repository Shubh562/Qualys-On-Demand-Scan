import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ComparisonTool.scss';

// Updated interfaces to match the new data structure
interface IFeatureTest {
  featurename: string;
  tests: string[];
}

interface IModuleData {
  name: string;
  testcases: IFeatureTest[];
  testcasesNotRunned: IFeatureTest[];
  dependency: string[];
}

interface IReleaseData {
  release: string;
  data: IModuleData[];
}

interface ISelections {
  application: string;
  module: string;
  release: string;
  moduleName: string;
}

const ComparisonTool: React.FC = () => {
  const [selections, setSelections] = useState<ISelections>({
    application: 'WIBSV',
    module: 'card-management',
    release: '',
    moduleName: '',
  });

  const [modulesData, setModulesData] = useState<IModuleData[]>([]);
  const [selectedModuleData, setSelectedModuleData] = useState<IModuleData | null>(null);

  useEffect(() => {
    if (selections.release) {
      const fetchReleaseData = async () => {
        try {
          const url = `http://your-api-endpoint/releases/${selections.release}`;
          const response = await axios.get<IReleaseData>(url);
          setModulesData(response.data.data);
        } catch (error) {
          console.error("Error fetching release data:", error);
          alert("Failed to fetch release data for the selected release");
        }
      };

      fetchReleaseData();
    }
  }, [selections.release]);

  const handleCompareClick = () => {
    const moduleData = modulesData.find(m => m.name === selections.moduleName) || null;
    setSelectedModuleData(moduleData);
  };

  // Helper function to format testcases and testcasesNotRunned
  const renderFeatureTests = (featureTests: IFeatureTest[]) => {
    return featureTests.map((featureTest, index) => (
      <div key={index}>
        <strong>{featureTest.featurename}:</strong> {featureTest.tests.join(', ')}
      </div>
    ));
  };

  return (
    <div className="comparison-container">
      {/* Selections Area */}
      {/* ... */}
      
      {selectedModuleData && (
        <div className="results-area">
          <table className="results-table">
            <thead>
              <tr>
                <th>Test Cases</th>
                <th>Test Cases Not Runned</th>
                <th>Dependencies</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{renderFeatureTests(selectedModuleData.testcases)}</td>
                <td>{renderFeatureTests(selectedModuleData.testcasesNotRunned)}</td>
                <td>{selectedModuleData.dependency.join(", ")}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ComparisonTool;
