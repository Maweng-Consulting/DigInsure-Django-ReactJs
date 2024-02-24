import React, { useState, useEffect} from 'react';
import Wrapper from '../../../components/Wrapper';

const AddBeneficiary = () => {
  return (
    <Wrapper>
    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
  <h1 class="h2">New Beneficiaries</h1>
  <div class="btn-toolbar mb-2 mb-md-0">
    <div class="btn-group me-2">
      <button type="button" class="btn btn-sm btn-outline-secondary">Share</button>
      <button type="button" class="btn btn-sm btn-outline-secondary">Export</button>
    </div>
    <button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle d-flex align-items-center gap-1">

      This week
    </button>
  </div>
</div>


<div class="table-responsive small">
  <table class="table table-sm">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Email</th>
        <th scope="col">Username</th>
        <th scope="col">Role</th>
        <th scope="col" colSpan={3}></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1,001</td>
        <td>random</td>
        <td>data</td>
        <td>placeholder</td>
        <td>text</td>
        <td>
          <a href='#' className='btn btn-info btn-sm'>
          <i class="bi bi-eye"></i>
          </a>
        </td>
        <td>
          <a href='#' className='btn btn-primary btn-sm'>
          <i class="bi bi-pencil-square"></i>
          </a>
        </td>
        <td>
          <a href='#' className='btn btn-danger btn-sm'>
          <i className="bi bi-trash"></i>
          </a>
        </td>
      </tr>
    </tbody>
  </table>
</div>
</main>
</Wrapper>
  )
}

export default AddBeneficiary