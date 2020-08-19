class PostsController < ApplicationController
  before_action :basic_auth

  def index  
    @posts = Post.all.order(id: "DESC")
  end

  def create
    post = Post.create(content: params[:content], checked: false)
    render json:{ post: post }
  end

  def checked
    post = Post.find(params[:id])
    if post.checked then # 3? 
      post.update(checked: false) # A.Recordのupdateで更新。既読していれば「既読を解除するためにfalseへ変更」
    else
      post.update(checked: true) # 既読していなければ「既読にするためtrueへ変更」
    end

    item = Post.find(params[:id])
    render json: { post: item } # post(任意)という形でitemをレスポンスする
  end

  private

  def basic_auth
    authenticate_or_request_with_http_basic do |username, password|
      username == ENV["BASIC_AUTH_USER"] && password == ENV["BASIC_AUTH_PASSWORD"]  # 環境変数を読み込む記述に変更
     end
  end
end
