"use client"

import React, { useState } from 'react';
import axios from 'axios';
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export function Sqlinjection2() {
  const [username, setUsername] = useState('');
  const [filePath, setFilePath] = useState('');
  const [filePaths, setFilePaths] = useState([]);
  const [error, setError] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleFilePathChange = (e) => {
    setFilePath(e.target.value);
  };


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log('Logging in with username:', username);
      const response = await axios.get(`/api/fetchFiles?username=${encodeURIComponent(username)}`);
      setFilePaths(response.data);
    } catch (err) {
      setError('Failed to fetch files');
      console.error('Error:', err);
    }
  };

  const handleUpload = async () => {
    try {
      await axios.post('/api/uploadFilePath', { username, filePath });
      setFilePaths([...filePaths, filePath]);
      setFilePath('');
    } catch (err) {
      setError('Failed to upload file path');
      console.error('Error:', err);
    }
  };

  return (
    <div
      key="1"
      className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-6 md:p-12 bg-gray-950 text-gray-50"
    >
      <div className="bg-blue-900/10 border border-gray-200 border-blue-700 rounded-lg p-6 space-y-4 dark:border-gray-800">
        <h2 className="text-blue-400 font-bold">Caution: SQL Vulnerability</h2>
        <p className="text-blue-500">
        SQL Injection is a type of attack that exploits vulnerabilities in the interaction between web applications and database servers. The attacker manipulates a standard SQL query to execute arbitrary SQL code. This can allow them to access, modify, or delete data that they should not have access to.
          <br />
          <br />
          <br />
          Try entering    <br />  <code>    ' OR '1'='1   </code> <br />  in the username field to see all files, simulating a SQL injection attack
        </p>
      </div>
      <div className="grid gap-6">
        <Card className="bg-gray-900 border border-gray-200 border-gray-800 dark:border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Enter Username</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-gray-300" htmlFor="username">
                  Username
                </Label>
                <Input
                  className="bg-gray-800 text-gray-50 border-gray-700"
                  id="username"
                  placeholder="Enter username"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </div>
              <Button
                className="w-full bg-blue-500 hover:bg-blue-600 text-gray-50"
                type="submit"
                onClick={(e) => handleLogin(e)}
              >
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border border-gray-200 border-gray-800 dark:border-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-200">Upload File Paths</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-gray-300" htmlFor="file-paths">
                  File Paths
                </Label>
                <Textarea
                  className="bg-gray-800 text-gray-50 border-gray-700"
                  id="file-paths"
                  placeholder="Enter file paths, one per line"
                  rows={4}
                  value={filePath}
                  onChange={handleFilePathChange}
                />
              </div>
              <Button
                className="w-full bg-blue-500 hover:bg-blue-600 text-gray-50"
                type="submit"
                onClick={handleUpload}
              >
                Upload
              </Button>
            </form>
          </CardContent>
          <Card
          className="bg-gray-900 border border-gray-200 border-gray-800 dark:border-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-200">Upload File Paths</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-gray-300">The following file paths are associated with the entered username:</p>
              <div className="space-y-1 text-gray-400">
              {filePaths.length > 0 ? (
            <ul>
              {filePaths.map((file, index) => (
                <li key={index}>{file.file_path}</li>
              ))}
            </ul>
          ) : (
            <p>No files to display</p>
          )}
                </div>
                
            </div>
          </CardContent>
        </Card>
        </Card>

        {error && (
          <div className="bg-red-500 text-white p-3 rounded-md">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
