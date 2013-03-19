class ProductsController < ApplicationController
  def index
    @products = Product.find(:all)
  end

  def create
    if Product.create(params[:product]).valid?
      @products = Product.find(:all)
      render :partial => "products_list"
    else
      render :text => "something wrong", :satus => "500"
    end
  end

  def update
    product = Product.find(params[:id])
    product.update_attribute('name', params[:product])
    render :text => ''

  end

  def delete
    Product.destroy(params[:id])
    @products = Product.find(:all)
    render :text => ""
  end
end
